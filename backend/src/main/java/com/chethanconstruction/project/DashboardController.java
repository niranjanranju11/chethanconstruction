package com.chethanconstruction.project;

import com.chethanconstruction.common.response.ApiResponse;
import com.chethanconstruction.enquiry.EnquiryRepository;
import com.chethanconstruction.enquiry.EnquiryStatus;
import com.chethanconstruction.project.dto.ProjectSummaryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Admin dashboard overview and metrics")
public class DashboardController {

    private final ProjectRepository projectRepository;
    private final ProjectService projectService;
    private final EnquiryRepository enquiryRepository;
    private final com.chethanconstruction.media.ProjectMediaRepository mediaRepository;

    @Data
    @Builder
    public static class StorageQuotaDto {
        private long totalBytesUsed;
        private long maxFreeBytes;
        private double usagePercentage;
        private boolean uploadAllowed;
        private String formattedUsed;
        private String formattedLimit;
    }

    @Data
    @Builder
    public static class DashboardSummaryDto {
        private long totalProjects;
        private long publishedProjects;
        private long ongoingProjects;
        private long completedProjects;
        private long upcomingProjects;
        private long newEnquiries;
        private long totalEnquiries;
        private List<ProjectSummaryDto> recentProjects;
        private StorageQuotaDto storageQuota;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Admin: Get dashboard summary metrics")
    public ApiResponse<DashboardSummaryDto> getDashboardSummary() {
        long totalProjects = projectRepository.count();
        long publishedProjects = projectRepository.countByPublishedTrue();
        long ongoingProjects = projectRepository.countByStatus(ProjectStatus.ONGOING);
        long completedProjects = projectRepository.countByStatus(ProjectStatus.COMPLETED);
        long upcomingProjects = projectRepository.countByStatus(ProjectStatus.UPCOMING);
        long newEnquiries = enquiryRepository.countByStatus(EnquiryStatus.NEW);
        long totalEnquiries = enquiryRepository.count();

        List<ProjectSummaryDto> recent = projectService.getAdminProjects(
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt"))
        ).getContent();

        // 10 GB Cloudflare R2 Free Allowance Hard Limit
        long maxFreeBytes = 10L * 1024 * 1024 * 1024;
        long usedBytes = mediaRepository.getTotalStorageUsedBytes();
        double percentage = maxFreeBytes > 0 ? (usedBytes * 100.0) / maxFreeBytes : 0.0;
        boolean uploadAllowed = usedBytes < maxFreeBytes;

        StorageQuotaDto storageQuota = StorageQuotaDto.builder()
                .totalBytesUsed(usedBytes)
                .maxFreeBytes(maxFreeBytes)
                .usagePercentage(Math.round(percentage * 100.0) / 100.0)
                .uploadAllowed(uploadAllowed)
                .formattedUsed(formatBytes(usedBytes))
                .formattedLimit(formatBytes(maxFreeBytes))
                .build();

        DashboardSummaryDto summary = DashboardSummaryDto.builder()
                .totalProjects(totalProjects)
                .publishedProjects(publishedProjects)
                .ongoingProjects(ongoingProjects)
                .completedProjects(completedProjects)
                .upcomingProjects(upcomingProjects)
                .newEnquiries(newEnquiries)
                .totalEnquiries(totalEnquiries)
                .recentProjects(recent)
                .storageQuota(storageQuota)
                .build();

        return ApiResponse.ok(summary);
    }

    private static String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        int exp = (int) (Math.log(bytes) / Math.log(1024));
        char pre = "KMGTPE".charAt(exp - 1);
        return String.format(java.util.Locale.US, "%.2f %sB", bytes / Math.pow(1024, exp), pre);
    }
}

package com.chethanconstruction.media;

import com.chethanconstruction.common.exception.AppException;
import com.chethanconstruction.common.exception.ErrorCode;
import com.chethanconstruction.common.exception.ResourceNotFoundException;
import com.chethanconstruction.media.dto.MediaDto;
import com.chethanconstruction.media.dto.ReorderMediaRequest;
import com.chethanconstruction.media.dto.UpdateMediaRequest;
import com.chethanconstruction.media.dto.UploadIntentRequest;
import com.chethanconstruction.media.dto.UploadIntentResponse;
import com.chethanconstruction.project.Project;
import com.chethanconstruction.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {

    private final ProjectMediaRepository mediaRepository;
    private final ProjectRepository projectRepository;
    private final StorageService storageService;

    @Value("${app.media.max-image-size:10485760}")
    private long maxImageSize;

    @Value("${app.media.max-video-size:262144000}")
    private long maxVideoSize;

    private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of(
            "image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"
    );

    private static final Set<String> ALLOWED_VIDEO_TYPES = Set.of(
            "video/mp4", "video/webm"
    );

    @Transactional
    public UploadIntentResponse createUploadIntent(UUID projectId, UploadIntentRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        String contentType = request.getContentType().toLowerCase().trim();
        MediaType mediaType;

        if (ALLOWED_IMAGE_TYPES.contains(contentType)) {
            mediaType = MediaType.IMAGE;
            if (request.getSizeBytes() > maxImageSize) {
                throw new AppException("Image size exceeds maximum limit of " + (maxImageSize / (1024 * 1024)) + "MB",
                        HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR);
            }
        } else if (ALLOWED_VIDEO_TYPES.contains(contentType)) {
            mediaType = MediaType.VIDEO;
            if (request.getSizeBytes() > maxVideoSize) {
                throw new AppException("Video size exceeds maximum limit of " + (maxVideoSize / (1024 * 1024)) + "MB",
                        HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR);
            }
        } else {
            throw new AppException("Unsupported file format: " + contentType + ". Allowed: JPEG, PNG, WebP, AVIF, MP4, WebM",
                    HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR);
        }

        UUID mediaId = UUID.randomUUID();
        String extension = getExtension(request.getFilename(), contentType);
        String storageKey = String.format("projects/%s/%s/original.%s", projectId, mediaId, extension);

        Duration presignedExpiration = Duration.ofMinutes(15);
        String uploadUrl = storageService.generateUploadPresignedUrl(
                storageKey, contentType, request.getSizeBytes(), presignedExpiration
        );
        String publicUrl = storageService.getPublicUrl(storageKey);

        // Check if project has no cover yet and this is an image
        boolean isCover = false;
        if (mediaType == MediaType.IMAGE) {
            isCover = mediaRepository.findByProjectIdAndCoverTrue(projectId).isEmpty();
        }

        // Determine display order
        List<ProjectMedia> existing = mediaRepository.findByProjectIdOrderByDisplayOrderAscCreatedAtDesc(projectId);
        int nextOrder = existing.size();

        ProjectMedia media = ProjectMedia.builder()
                .id(mediaId)
                .project(project)
                .storageKey(storageKey)
                .publicUrl(publicUrl)
                .mediaType(mediaType)
                .stage(request.getStage() != null ? request.getStage() : MediaStage.GENERAL)
                .originalFilename(sanitizeFilename(request.getFilename()))
                .mimeType(contentType)
                .sizeBytes(request.getSizeBytes())
                .displayOrder(nextOrder)
                .cover(isCover)
                .build();

        mediaRepository.save(media);
        log.info("Created upload intent for project {} media {}", projectId, mediaId);

        return UploadIntentResponse.builder()
                .mediaId(mediaId)
                .storageKey(storageKey)
                .uploadUrl(uploadUrl)
                .expiresInSeconds(presignedExpiration.toSeconds())
                .publicUrl(publicUrl)
                .build();
    }

    @Transactional
    public MediaDto completeUpload(UUID projectId, UUID mediaId) {
        ProjectMedia media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Media", "id", mediaId));

        if (!media.getProject().getId().equals(projectId)) {
            throw AppException.badRequest("Media does not belong to project " + projectId);
        }

        if (media.getPublicUrl() == null) {
            media.setPublicUrl(storageService.getPublicUrl(media.getStorageKey()));
            mediaRepository.save(media);
        }

        log.info("Completed upload confirmation for media {}", mediaId);
        return mapToDto(media);
    }

    @Transactional
    public MediaDto updateMedia(UUID mediaId, UpdateMediaRequest request) {
        ProjectMedia media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Media", "id", mediaId));

        if (request.getStage() != null) {
            media.setStage(request.getStage());
        }
        if (request.getDisplayOrder() != null) {
            media.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getCover() != null && request.getCover()) {
            mediaRepository.resetCoverForProject(media.getProject().getId());
            media.setCover(true);
        }

        ProjectMedia updated = mediaRepository.save(media);
        return mapToDto(updated);
    }

    @Transactional
    public void reorderMedia(UUID projectId, ReorderMediaRequest request) {
        List<UUID> orderedIds = request.getMediaIds();
        for (int i = 0; i < orderedIds.size(); i++) {
            UUID id = orderedIds.get(i);
            ProjectMedia media = mediaRepository.findById(id).orElse(null);
            if (media != null && media.getProject().getId().equals(projectId)) {
                media.setDisplayOrder(i);
                mediaRepository.save(media);
            }
        }
    }

    @Transactional
    public void deleteMedia(UUID mediaId) {
        ProjectMedia media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Media", "id", mediaId));

        storageService.deleteObject(media.getStorageKey());
        mediaRepository.delete(media);
        log.info("Deleted media record and storage object for {}", mediaId);
    }

    public MediaDto mapToDto(ProjectMedia media) {
        return MediaDto.builder()
                .id(media.getId())
                .projectId(media.getProject().getId())
                .storageKey(media.getStorageKey())
                .publicUrl(media.getPublicUrl())
                .mediaType(media.getMediaType())
                .stage(media.getStage())
                .originalFilename(media.getOriginalFilename())
                .mimeType(media.getMimeType())
                .sizeBytes(media.getSizeBytes())
                .width(media.getWidth())
                .height(media.getHeight())
                .durationSeconds(media.getDurationSeconds())
                .thumbnailUrl(media.getThumbnailUrl())
                .displayOrder(media.getDisplayOrder())
                .cover(media.isCover())
                .createdAt(media.getCreatedAt())
                .build();
    }

    private String getExtension(String filename, String contentType) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        }
        return switch (contentType) {
            case "image/png" -> "png";
            case "image/webp" -> "webp";
            case "image/avif" -> "avif";
            case "video/mp4" -> "mp4";
            case "video/webm" -> "webm";
            default -> "jpg";
        };
    }

    private String sanitizeFilename(String filename) {
        if (filename == null) return "file";
        return filename.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}

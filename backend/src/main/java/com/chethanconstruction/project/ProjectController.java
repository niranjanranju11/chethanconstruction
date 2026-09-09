package com.chethanconstruction.project;

import com.chethanconstruction.common.response.ApiResponse;
import com.chethanconstruction.common.response.PageResponse;
import com.chethanconstruction.project.dto.CreateProjectRequest;
import com.chethanconstruction.project.dto.ProjectDto;
import com.chethanconstruction.project.dto.ProjectSummaryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Construction project showcase and management")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects")
    @Operation(summary = "Get published projects", description = "Returns paginated list of published construction projects with optional filters.")
    public ApiResponse<PageResponse<ProjectSummaryDto>> getPublicProjects(
            @RequestParam(required = false) ProjectStatus status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        PageResponse<ProjectSummaryDto> result = projectService.getPublicProjects(
                status, type, featured, search, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return ApiResponse.ok(result);
    }

    @GetMapping("/projects/featured")
    @Operation(summary = "Get featured projects", description = "Returns up to 6 featured published projects for homepage.")
    public ApiResponse<List<ProjectSummaryDto>> getFeaturedProjects() {
        return ApiResponse.ok(projectService.getFeaturedProjects());
    }

    @GetMapping("/projects/{slug}")
    @Operation(summary = "Get project detail by slug", description = "Returns full project details and gallery media for public view.")
    public ApiResponse<ProjectDto> getPublicProjectBySlug(@PathVariable String slug) {
        return ApiResponse.ok(projectService.getPublicProjectBySlug(slug));
    }

    // Admin endpoints
    @GetMapping("/admin/projects")
    @Operation(summary = "Admin: List all projects", description = "Returns all projects including drafts and unpublished.")
    public ApiResponse<PageResponse<ProjectSummaryDto>> getAdminProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageResponse<ProjectSummaryDto> result = projectService.getAdminProjects(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return ApiResponse.ok(result);
    }

    @GetMapping("/admin/projects/{id}")
    @Operation(summary = "Admin: Get project by ID")
    public ApiResponse<ProjectDto> getAdminProjectById(@PathVariable UUID id) {
        return ApiResponse.ok(projectService.getAdminProjectById(id));
    }

    @PostMapping("/admin/projects")
    @Operation(summary = "Admin: Create project")
    public ApiResponse<ProjectDto> createProject(@Valid @RequestBody CreateProjectRequest request) {
        ProjectDto created = projectService.createProject(request);
        return ApiResponse.ok("Project created successfully", created);
    }

    @PutMapping("/admin/projects/{id}")
    @Operation(summary = "Admin: Update project")
    public ApiResponse<ProjectDto> updateProject(
            @PathVariable UUID id, @Valid @RequestBody CreateProjectRequest request) {
        ProjectDto updated = projectService.updateProject(id, request);
        return ApiResponse.ok("Project updated successfully", updated);
    }

    @PatchMapping("/admin/projects/{id}/publish")
    @Operation(summary = "Admin: Toggle project publish status")
    public ApiResponse<ProjectDto> togglePublish(
            @PathVariable UUID id, @RequestBody Map<String, Boolean> body) {
        boolean published = body.getOrDefault("published", true);
        ProjectDto updated = projectService.setPublishStatus(id, published);
        return ApiResponse.ok("Publish status updated", updated);
    }

    @DeleteMapping("/admin/projects/{id}")
    @Operation(summary = "Admin: Delete project")
    public ApiResponse<Void> deleteProject(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ApiResponse.okMsg("Project deleted successfully");
    }
}

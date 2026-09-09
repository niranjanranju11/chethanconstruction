package com.chethanconstruction.project;

import com.chethanconstruction.common.exception.AppException;
import com.chethanconstruction.common.exception.ResourceNotFoundException;
import com.chethanconstruction.common.response.PageResponse;
import com.chethanconstruction.media.MediaService;
import com.chethanconstruction.media.ProjectMedia;
import com.chethanconstruction.media.dto.MediaDto;
import com.chethanconstruction.project.dto.CreateProjectRequest;
import com.chethanconstruction.project.dto.ProjectDto;
import com.chethanconstruction.project.dto.ProjectSummaryDto;
import com.chethanconstruction.service.ServiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;
    private final MediaService mediaService;

    @Transactional(readOnly = true)
    public PageResponse<ProjectSummaryDto> getPublicProjects(
            ProjectStatus status, String type, Boolean featured, String search, Pageable pageable) {
        Page<Project> page = repository.findPublishedProjects(status, type, featured, search, pageable);
        List<ProjectSummaryDto> items = page.getContent().stream().map(this::mapToSummaryDto).toList();
        return PageResponse.from(page, items);
    }

    @Transactional(readOnly = true)
    public List<ProjectSummaryDto> getFeaturedProjects() {
        return repository.findTop6ByPublishedTrueAndFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToSummaryDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectDto getPublicProjectBySlug(String slug) {
        Project project = repository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "slug", slug));
        return mapToDetailDto(project);
    }

    @Transactional(readOnly = true)
    public PageResponse<ProjectSummaryDto> getAdminProjects(Pageable pageable) {
        Page<Project> page = repository.findAll(pageable);
        List<ProjectSummaryDto> items = page.getContent().stream().map(this::mapToSummaryDto).toList();
        return PageResponse.from(page, items);
    }

    @Transactional(readOnly = true)
    public ProjectDto getAdminProjectById(UUID id) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return mapToDetailDto(project);
    }

    @Transactional
    public ProjectDto createProject(CreateProjectRequest request) {
        String slug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? ServiceService.toSlug(request.getSlug())
                : ServiceService.toSlug(request.getTitle());

        if (repository.existsBySlug(slug)) {
            slug = slug + "-" + UUID.randomUUID().toString().substring(0, 5);
        }

        Project entity = Project.builder()
                .title(request.getTitle().trim())
                .slug(slug)
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .location(request.getLocation())
                .projectType(request.getProjectType())
                .area(request.getArea())
                .startDate(request.getStartDate())
                .completionDate(request.getCompletionDate())
                .status(request.getStatus())
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .published(request.getPublished() != null ? request.getPublished() : false)
                .seoTitle(request.getSeoTitle())
                .seoDescription(request.getSeoDescription())
                .build();

        Project saved = repository.save(entity);
        log.info("Created new project: '{}' with id: {}", saved.getTitle(), saved.getId());
        return mapToDetailDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(UUID id, CreateProjectRequest request) {
        Project entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        entity.setTitle(request.getTitle().trim());

        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            String newSlug = ServiceService.toSlug(request.getSlug());
            if (!newSlug.equalsIgnoreCase(entity.getSlug()) && repository.existsBySlug(newSlug)) {
                throw AppException.conflict("A project with slug '" + newSlug + "' already exists");
            }
            entity.setSlug(newSlug);
        }

        entity.setShortDescription(request.getShortDescription());
        entity.setDescription(request.getDescription());
        entity.setLocation(request.getLocation());
        entity.setProjectType(request.getProjectType());
        entity.setArea(request.getArea());
        entity.setStartDate(request.getStartDate());
        entity.setCompletionDate(request.getCompletionDate());
        entity.setStatus(request.getStatus());
        if (request.getFeatured() != null) {
            entity.setFeatured(request.getFeatured());
        }
        if (request.getPublished() != null) {
            entity.setPublished(request.getPublished());
        }
        entity.setSeoTitle(request.getSeoTitle());
        entity.setSeoDescription(request.getSeoDescription());

        Project updated = repository.save(entity);
        log.info("Updated project id: {}", id);
        return mapToDetailDto(updated);
    }

    @Transactional
    public ProjectDto setPublishStatus(UUID id, boolean published) {
        Project entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        entity.setPublished(published);
        Project saved = repository.save(entity);
        log.info("Project '{}' publish status changed to: {}", saved.getTitle(), published);
        return mapToDetailDto(saved);
    }

    @Transactional
    public void deleteProject(UUID id) {
        Project entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        // Delete associated media files from storage
        if (entity.getMedia() != null) {
            entity.getMedia().forEach(m -> mediaService.deleteMedia(m.getId()));
        }

        repository.delete(entity);
        log.info("Deleted project id: {}", id);
    }

    private ProjectSummaryDto mapToSummaryDto(Project entity) {
        MediaDto coverMedia = entity.getMedia().stream()
                .filter(ProjectMedia::isCover)
                .findFirst()
                .or(() -> entity.getMedia().stream().findFirst())
                .map(mediaService::mapToDto)
                .orElse(null);

        return ProjectSummaryDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .shortDescription(entity.getShortDescription())
                .location(entity.getLocation())
                .projectType(entity.getProjectType())
                .area(entity.getArea())
                .startDate(entity.getStartDate())
                .completionDate(entity.getCompletionDate())
                .status(entity.getStatus())
                .featured(entity.isFeatured())
                .published(entity.isPublished())
                .coverMedia(coverMedia)
                .mediaCount(entity.getMedia() != null ? entity.getMedia().size() : 0)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    private ProjectDto mapToDetailDto(Project entity) {
        List<MediaDto> mediaList = entity.getMedia().stream()
                .sorted(Comparator.comparingInt(ProjectMedia::getDisplayOrder)
                        .thenComparing(ProjectMedia::getCreatedAt, Comparator.reverseOrder()))
                .map(mediaService::mapToDto)
                .toList();

        MediaDto coverMedia = mediaList.stream()
                .filter(MediaDto::isCover)
                .findFirst()
                .or(() -> mediaList.stream().findFirst())
                .orElse(null);

        return ProjectDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .shortDescription(entity.getShortDescription())
                .description(entity.getDescription())
                .location(entity.getLocation())
                .projectType(entity.getProjectType())
                .area(entity.getArea())
                .startDate(entity.getStartDate())
                .completionDate(entity.getCompletionDate())
                .status(entity.getStatus())
                .featured(entity.isFeatured())
                .published(entity.isPublished())
                .seoTitle(entity.getSeoTitle())
                .seoDescription(entity.getSeoDescription())
                .coverMedia(coverMedia)
                .media(mediaList)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

package com.chethanconstruction.service;

import com.chethanconstruction.common.exception.AppException;
import com.chethanconstruction.common.exception.ResourceNotFoundException;
import com.chethanconstruction.service.dto.CreateServiceRequest;
import com.chethanconstruction.service.dto.ServiceDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceService {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    private final ServiceRepository repository;

    @Transactional(readOnly = true)
    public List<ServiceDto> getPublicServices() {
        return repository.findByPublishedTrueOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ServiceDto> getAllAdminServices() {
        return repository.findAllByOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ServiceDto getById(UUID id) {
        ConstructionService service = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));
        return mapToDto(service);
    }

    @Transactional
    public ServiceDto createService(CreateServiceRequest request) {
        String slug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? toSlug(request.getSlug())
                : toSlug(request.getName());

        if (repository.existsBySlug(slug)) {
            slug = slug + "-" + UUID.randomUUID().toString().substring(0, 5);
        }

        ConstructionService entity = ConstructionService.builder()
                .name(request.getName().trim())
                .slug(slug)
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .published(request.getPublished() != null ? request.getPublished() : true)
                .build();

        ConstructionService saved = repository.save(entity);
        log.info("Created new service: {} with id: {}", saved.getName(), saved.getId());
        return mapToDto(saved);
    }

    @Transactional
    public ServiceDto updateService(UUID id, CreateServiceRequest request) {
        ConstructionService entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));

        entity.setName(request.getName().trim());
        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            String newSlug = toSlug(request.getSlug());
            if (!newSlug.equalsIgnoreCase(entity.getSlug()) && repository.existsBySlug(newSlug)) {
                throw AppException.conflict("A service with slug '" + newSlug + "' already exists");
            }
            entity.setSlug(newSlug);
        }
        entity.setShortDescription(request.getShortDescription());
        entity.setDescription(request.getDescription());
        entity.setImageUrl(request.getImageUrl());
        if (request.getDisplayOrder() != null) {
            entity.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getPublished() != null) {
            entity.setPublished(request.getPublished());
        }

        ConstructionService updated = repository.save(entity);
        log.info("Updated service with id: {}", id);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteService(UUID id) {
        ConstructionService entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));
        repository.delete(entity);
        log.info("Deleted service with id: {}", id);
    }

    private ServiceDto mapToDto(ConstructionService entity) {
        return ServiceDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .shortDescription(entity.getShortDescription())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .displayOrder(entity.getDisplayOrder())
                .published(entity.isPublished())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static String toSlug(String input) {
        if (input == null) return "";
        String nowhitespace = WHITESPACE.matcher(input.trim()).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NON_LATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH).replaceAll("-+", "-").replaceAll("^-|-$", "");
    }
}

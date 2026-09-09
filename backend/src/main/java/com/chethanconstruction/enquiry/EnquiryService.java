package com.chethanconstruction.enquiry;

import com.chethanconstruction.common.exception.ResourceNotFoundException;
import com.chethanconstruction.common.response.PageResponse;
import com.chethanconstruction.enquiry.dto.CreateEnquiryRequest;
import com.chethanconstruction.enquiry.dto.EnquiryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnquiryService {

    private final EnquiryRepository repository;

    @Transactional
    public EnquiryDto createEnquiry(CreateEnquiryRequest request) {
        Enquiry entity = Enquiry.builder()
                .name(request.getName().trim())
                .phone(request.getPhone().trim())
                .email(request.getEmail() != null ? request.getEmail().trim() : null)
                .projectType(request.getProjectType())
                .location(request.getLocation())
                .budget(request.getBudget())
                .message(request.getMessage().trim())
                .status(EnquiryStatus.NEW)
                .build();

        Enquiry saved = repository.save(entity);
        log.info("New enquiry received from: {} ({})", saved.getName(), saved.getPhone());
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public PageResponse<EnquiryDto> getEnquiries(EnquiryStatus status, Pageable pageable) {
        Page<Enquiry> page = (status != null)
                ? repository.findByStatus(status, pageable)
                : repository.findAll(pageable);

        List<EnquiryDto> dtos = page.getContent().stream().map(this::mapToDto).toList();
        return PageResponse.from(page, dtos);
    }

    @Transactional(readOnly = true)
    public EnquiryDto getEnquiryById(UUID id) {
        Enquiry entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        return mapToDto(entity);
    }

    @Transactional
    public EnquiryDto updateStatus(UUID id, EnquiryStatus status) {
        Enquiry entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        entity.setStatus(status);
        Enquiry updated = repository.save(entity);
        log.info("Enquiry {} status updated to {}", id, status);
        return mapToDto(updated);
    }

    @Transactional
    public EnquiryDto updateNotes(UUID id, String notes) {
        Enquiry entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        entity.setInternalNotes(notes);
        Enquiry updated = repository.save(entity);
        log.info("Enquiry {} internal notes updated", id);
        return mapToDto(updated);
    }

    private EnquiryDto mapToDto(Enquiry entity) {
        return EnquiryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .projectType(entity.getProjectType())
                .location(entity.getLocation())
                .budget(entity.getBudget())
                .message(entity.getMessage())
                .status(entity.getStatus())
                .internalNotes(entity.getInternalNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

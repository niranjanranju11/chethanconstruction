package com.chethanconstruction.testimonial;

import com.chethanconstruction.common.exception.ResourceNotFoundException;
import com.chethanconstruction.testimonial.dto.TestimonialDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository repository;

    @Transactional(readOnly = true)
    public List<TestimonialDto> getPublicTestimonials() {
        return repository.findByPublishedTrueOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TestimonialDto> getAllAdminTestimonials() {
        return repository.findAllByOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional
    public TestimonialDto createTestimonial(TestimonialDto dto) {
        Testimonial entity = Testimonial.builder()
                .customerName(dto.getCustomerName().trim())
                .customerRoleOrContext(dto.getCustomerRoleOrContext())
                .quote(dto.getQuote().trim())
                .photoUrl(dto.getPhotoUrl())
                .rating(dto.getRating() != null ? dto.getRating() : 5)
                .published(dto.isPublished())
                .displayOrder(dto.getDisplayOrder())
                .build();

        Testimonial saved = repository.save(entity);
        log.info("Created testimonial from {}", saved.getCustomerName());
        return mapToDto(saved);
    }

    @Transactional
    public TestimonialDto updateTestimonial(UUID id, TestimonialDto dto) {
        Testimonial entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial", "id", id));

        entity.setCustomerName(dto.getCustomerName().trim());
        entity.setCustomerRoleOrContext(dto.getCustomerRoleOrContext());
        entity.setQuote(dto.getQuote().trim());
        entity.setPhotoUrl(dto.getPhotoUrl());
        entity.setRating(dto.getRating());
        entity.setPublished(dto.isPublished());
        entity.setDisplayOrder(dto.getDisplayOrder());

        Testimonial updated = repository.save(entity);
        log.info("Updated testimonial id: {}", id);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteTestimonial(UUID id) {
        Testimonial entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial", "id", id));
        repository.delete(entity);
        log.info("Deleted testimonial id: {}", id);
    }

    private TestimonialDto mapToDto(Testimonial entity) {
        return TestimonialDto.builder()
                .id(entity.getId())
                .customerName(entity.getCustomerName())
                .customerRoleOrContext(entity.getCustomerRoleOrContext())
                .quote(entity.getQuote())
                .photoUrl(entity.getPhotoUrl())
                .rating(entity.getRating())
                .published(entity.isPublished())
                .displayOrder(entity.getDisplayOrder())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

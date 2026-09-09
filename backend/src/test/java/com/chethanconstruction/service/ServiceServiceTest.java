package com.chethanconstruction.service;

import com.chethanconstruction.service.dto.CreateServiceRequest;
import com.chethanconstruction.service.dto.ServiceDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceServiceTest {

    @Mock
    private ServiceRepository repository;

    @InjectMocks
    private ServiceService service;

    @Test
    void toSlug_generatesCleanUrlSafeSlug() {
        assertEquals("residential-construction", ServiceService.toSlug("Residential Construction"));
        assertEquals("civil-works-remodeling", ServiceService.toSlug("Civil Works & Remodeling!"));
        assertEquals("waterproofing-expert", ServiceService.toSlug("  Waterproofing Expert   "));
    }

    @Test
    void createService_createsEntityWithAutoSlug() {
        CreateServiceRequest request = CreateServiceRequest.builder()
                .name("Structural Renovation")
                .shortDescription("Expert renovations")
                .published(true)
                .build();

        when(repository.existsBySlug("structural-renovation")).thenReturn(false);
        when(repository.save(any(ConstructionService.class))).thenAnswer(invocation -> {
            ConstructionService entity = invocation.getArgument(0);
            entity.setId(UUID.randomUUID());
            entity.setCreatedAt(Instant.now());
            entity.setUpdatedAt(Instant.now());
            return entity;
        });

        ServiceDto result = service.createService(request);

        assertNotNull(result);
        assertEquals("Structural Renovation", result.getName());
        assertEquals("structural-renovation", result.getSlug());
        assertTrue(result.isPublished());
        verify(repository, times(1)).save(any(ConstructionService.class));
    }
}

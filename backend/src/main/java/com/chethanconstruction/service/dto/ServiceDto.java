package com.chethanconstruction.service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {
    private UUID id;
    private String name;
    private String slug;
    private String shortDescription;
    private String description;
    private String imageUrl;
    private int displayOrder;
    private boolean published;
    private Instant createdAt;
    private Instant updatedAt;
}

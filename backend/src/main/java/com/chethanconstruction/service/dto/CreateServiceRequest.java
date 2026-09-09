package com.chethanconstruction.service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateServiceRequest {
    @NotBlank(message = "Service name is required")
    private String name;

    private String slug;
    private String shortDescription;
    private String description;
    private String imageUrl;
    private Integer displayOrder;
    private Boolean published;
}

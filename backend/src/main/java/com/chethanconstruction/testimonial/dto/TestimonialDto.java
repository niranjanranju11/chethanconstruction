package com.chethanconstruction.testimonial.dto;

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
public class TestimonialDto {
    private UUID id;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerRoleOrContext;

    @NotBlank(message = "Quote text is required")
    private String quote;

    private String photoUrl;
    private Integer rating;
    private boolean published;
    private int displayOrder;
    private Instant createdAt;
    private Instant updatedAt;
}

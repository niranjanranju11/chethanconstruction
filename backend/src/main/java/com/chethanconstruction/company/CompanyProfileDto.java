package com.chethanconstruction.company;

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
public class CompanyProfileDto {
    private UUID id;

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String tagline;
    private String shortDescription;
    private String fullDescription;
    private String phone;
    private String whatsapp;
    private String email;
    private String address;
    private String serviceArea;
    private String googleMapsUrl;
    private UUID logoMediaId;
    private UUID heroMediaId;
    private String logoUrl;
    private String heroUrl;
    private Instant updatedAt;
}

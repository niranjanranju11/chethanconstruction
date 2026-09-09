package com.chethanconstruction.enquiry.dto;

import com.chethanconstruction.enquiry.EnquiryStatus;
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
public class EnquiryDto {
    private UUID id;
    private String name;
    private String phone;
    private String email;
    private String projectType;
    private String location;
    private String budget;
    private String message;
    private EnquiryStatus status;
    private String internalNotes;
    private Instant createdAt;
    private Instant updatedAt;
}

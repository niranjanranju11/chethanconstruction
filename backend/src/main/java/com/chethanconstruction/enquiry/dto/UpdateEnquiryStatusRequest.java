package com.chethanconstruction.enquiry.dto;

import com.chethanconstruction.enquiry.EnquiryStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEnquiryStatusRequest {
    @NotNull(message = "Status is required")
    private EnquiryStatus status;
}

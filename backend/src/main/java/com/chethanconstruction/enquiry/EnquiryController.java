package com.chethanconstruction.enquiry;

import com.chethanconstruction.common.response.ApiResponse;
import com.chethanconstruction.common.response.PageResponse;
import com.chethanconstruction.enquiry.dto.CreateEnquiryRequest;
import com.chethanconstruction.enquiry.dto.EnquiryDto;
import com.chethanconstruction.enquiry.dto.UpdateEnquiryNotesRequest;
import com.chethanconstruction.enquiry.dto.UpdateEnquiryStatusRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Enquiries", description = "Customer enquiries and lead capture")
public class EnquiryController {

    private final EnquiryService service;

    @PostMapping("/enquiries")
    @Operation(summary = "Submit public enquiry", description = "Allows visitors to request quotes or make contact.")
    public ApiResponse<EnquiryDto> submitEnquiry(@Valid @RequestBody CreateEnquiryRequest request) {
        EnquiryDto created = service.createEnquiry(request);
        return ApiResponse.ok("Thank you! Your enquiry has been submitted. Our team will contact you shortly.", created);
    }

    @GetMapping("/admin/enquiries")
    @Operation(summary = "Admin: List enquiries", description = "Returns paginated enquiries with optional status filter.")
    public ApiResponse<PageResponse<EnquiryDto>> getAdminEnquiries(
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageResponse<EnquiryDto> result = service.getEnquiries(
                status, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return ApiResponse.ok(result);
    }

    @GetMapping("/admin/enquiries/{id}")
    @Operation(summary = "Admin: Get enquiry detail")
    public ApiResponse<EnquiryDto> getAdminEnquiryById(@PathVariable UUID id) {
        return ApiResponse.ok(service.getEnquiryById(id));
    }

    @PatchMapping("/admin/enquiries/{id}/status")
    @Operation(summary = "Admin: Update enquiry status")
    public ApiResponse<EnquiryDto> updateStatus(
            @PathVariable UUID id, @Valid @RequestBody UpdateEnquiryStatusRequest request) {
        EnquiryDto updated = service.updateStatus(id, request.getStatus());
        return ApiResponse.ok("Enquiry status updated", updated);
    }

    @PatchMapping("/admin/enquiries/{id}/notes")
    @Operation(summary = "Admin: Update enquiry internal notes")
    public ApiResponse<EnquiryDto> updateNotes(
            @PathVariable UUID id, @RequestBody UpdateEnquiryNotesRequest request) {
        EnquiryDto updated = service.updateNotes(id, request.getInternalNotes());
        return ApiResponse.ok("Notes updated", updated);
    }
}

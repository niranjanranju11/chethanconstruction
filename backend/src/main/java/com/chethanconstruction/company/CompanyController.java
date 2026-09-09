package com.chethanconstruction.company;

import com.chethanconstruction.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Company Profile", description = "Company profile and contact details")
public class CompanyController {

    private final CompanyProfileService service;

    @GetMapping("/company")
    @Operation(summary = "Get company profile", description = "Returns public company details, contact information, and address.")
    public ApiResponse<CompanyProfileDto> getPublicProfile() {
        return ApiResponse.ok(service.getProfileDto());
    }

    @GetMapping("/admin/company")
    @Operation(summary = "Admin: Get company profile", description = "Returns full company profile for administrator.")
    public ApiResponse<CompanyProfileDto> getAdminProfile() {
        return ApiResponse.ok(service.getProfileDto());
    }

    @PutMapping("/admin/company")
    @Operation(summary = "Admin: Update company profile", description = "Updates company information, contact numbers, address, and descriptions.")
    public ApiResponse<CompanyProfileDto> updateProfile(@Valid @RequestBody CompanyProfileDto dto) {
        CompanyProfileDto updated = service.updateProfile(dto);
        return ApiResponse.ok("Company profile updated successfully", updated);
    }
}

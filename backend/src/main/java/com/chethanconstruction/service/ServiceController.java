package com.chethanconstruction.service;

import com.chethanconstruction.common.response.ApiResponse;
import com.chethanconstruction.service.dto.CreateServiceRequest;
import com.chethanconstruction.service.dto.ServiceDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Services", description = "Construction services management")
public class ServiceController {

    private final ServiceService service;

    @GetMapping("/services")
    @Operation(summary = "Get published services", description = "Returns active published construction services.")
    public ApiResponse<List<ServiceDto>> getPublicServices() {
        return ApiResponse.ok(service.getPublicServices());
    }

    @GetMapping("/admin/services")
    @Operation(summary = "Admin: List all services", description = "Returns all services including drafts and unpublished.")
    public ApiResponse<List<ServiceDto>> getAllAdminServices() {
        return ApiResponse.ok(service.getAllAdminServices());
    }

    @GetMapping("/admin/services/{id}")
    @Operation(summary = "Admin: Get service by ID")
    public ApiResponse<ServiceDto> getById(@PathVariable UUID id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PostMapping("/admin/services")
    @Operation(summary = "Admin: Create service")
    public ApiResponse<ServiceDto> create(@Valid @RequestBody CreateServiceRequest request) {
        ServiceDto created = service.createService(request);
        return ApiResponse.ok("Service created successfully", created);
    }

    @PutMapping("/admin/services/{id}")
    @Operation(summary = "Admin: Update service")
    public ApiResponse<ServiceDto> update(@PathVariable UUID id, @Valid @RequestBody CreateServiceRequest request) {
        ServiceDto updated = service.updateService(id, request);
        return ApiResponse.ok("Service updated successfully", updated);
    }

    @DeleteMapping("/admin/services/{id}")
    @Operation(summary = "Admin: Delete service")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        service.deleteService(id);
        return ApiResponse.okMsg("Service deleted successfully");
    }
}

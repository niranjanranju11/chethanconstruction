package com.chethanconstruction.testimonial;

import com.chethanconstruction.common.response.ApiResponse;
import com.chethanconstruction.testimonial.dto.TestimonialDto;
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
@Tag(name = "Testimonials", description = "Customer reviews and testimonials")
public class TestimonialController {

    private final TestimonialService service;

    @GetMapping("/testimonials")
    @Operation(summary = "Get published testimonials")
    public ApiResponse<List<TestimonialDto>> getPublicTestimonials() {
        return ApiResponse.ok(service.getPublicTestimonials());
    }

    @GetMapping("/admin/testimonials")
    @Operation(summary = "Admin: List all testimonials")
    public ApiResponse<List<TestimonialDto>> getAllAdminTestimonials() {
        return ApiResponse.ok(service.getAllAdminTestimonials());
    }

    @PostMapping("/admin/testimonials")
    @Operation(summary = "Admin: Create testimonial")
    public ApiResponse<TestimonialDto> create(@Valid @RequestBody TestimonialDto dto) {
        TestimonialDto created = service.createTestimonial(dto);
        return ApiResponse.ok("Testimonial created successfully", created);
    }

    @PutMapping("/admin/testimonials/{id}")
    @Operation(summary = "Admin: Update testimonial")
    public ApiResponse<TestimonialDto> update(@PathVariable UUID id, @Valid @RequestBody TestimonialDto dto) {
        TestimonialDto updated = service.updateTestimonial(id, dto);
        return ApiResponse.ok("Testimonial updated successfully", updated);
    }

    @DeleteMapping("/admin/testimonials/{id}")
    @Operation(summary = "Admin: Delete testimonial")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        service.deleteTestimonial(id);
        return ApiResponse.okMsg("Testimonial deleted successfully");
    }
}

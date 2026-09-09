package com.chethanconstruction.common;

import com.chethanconstruction.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health", description = "Application health and status endpoints")
public class HealthController {

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Verifies that the backend API is up and functioning.")
    public ApiResponse<Map<String, Object>> health() {
        return ApiResponse.ok(Map.of(
                "status", "UP",
                "service", "Chethan Construction Backend API",
                "version", "1.0.0"
        ));
    }
}

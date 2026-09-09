package com.chethanconstruction.auth;

import com.chethanconstruction.auth.dto.LoginRequest;
import com.chethanconstruction.auth.dto.LoginResponse;
import com.chethanconstruction.auth.dto.UserDto;
import com.chethanconstruction.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication and admin session endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Admin login", description = "Authenticates an administrator and returns a JWT access token.")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponse.ok("Login successful", response);
    }

    @GetMapping("/me")
    @Operation(summary = "Current authenticated user", description = "Returns profile information for the authenticated user.")
    public ApiResponse<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        UserDto user = authService.getCurrentUser(userDetails.getUsername());
        return ApiResponse.ok(user);
    }
}

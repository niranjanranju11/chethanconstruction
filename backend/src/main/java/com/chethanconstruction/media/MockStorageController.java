package com.chethanconstruction.media;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@RestController
@RequestMapping("/api/v1/mock-storage")
@Tag(name = "Mock Storage", description = "Simulated direct object storage endpoint for offline local development")
public class MockStorageController {

    private final Path storageRoot = Paths.get("data", "uploads").toAbsolutePath().normalize();

    public MockStorageController() {
        try {
            Files.createDirectories(storageRoot);
        } catch (IOException e) {
            log.error("Could not initialize local upload directory", e);
        }
    }

    @PutMapping("/upload")
    @Operation(summary = "Mock upload endpoint", description = "Accepts direct binary uploads during local development.")
    public ResponseEntity<Void> mockUpload(
            @RequestParam("key") String key,
            HttpServletRequest request
    ) {
        try {
            // Prevent directory traversal
            Path targetPath = storageRoot.resolve(key).normalize();
            if (!targetPath.startsWith(storageRoot)) {
                return ResponseEntity.badRequest().build();
            }

            Files.createDirectories(targetPath.getParent());
            try (InputStream in = request.getInputStream(); OutputStream out = Files.newOutputStream(targetPath)) {
                in.transferTo(out);
            }
            log.info("[Mock Storage] Saved uploaded file to {} (size: {} bytes)", targetPath, Files.size(targetPath));
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            log.error("[Mock Storage] Failed to write file for key: {}", key, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/files/**")
    @Operation(summary = "Serve uploaded mock file", description = "Streams locally stored files for offline preview.")
    public ResponseEntity<Resource> serveFile(HttpServletRequest request) {
        String fullPath = request.getRequestURI();
        String prefix = "/api/v1/mock-storage/files/";
        int index = fullPath.indexOf(prefix);
        if (index == -1) {
            return ResponseEntity.notFound().build();
        }
        String key = fullPath.substring(index + prefix.length());

        Path targetPath = storageRoot.resolve(key).normalize();
        if (!targetPath.startsWith(storageRoot) || !Files.exists(targetPath)) {
            return ResponseEntity.notFound().build();
        }

        try {
            Resource resource = new UrlResource(targetPath.toUri());
            String contentType = Files.probeContentType(targetPath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

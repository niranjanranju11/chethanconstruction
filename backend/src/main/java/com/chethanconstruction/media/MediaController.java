package com.chethanconstruction.media;

import com.chethanconstruction.common.response.ApiResponse;
import com.chethanconstruction.media.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Media", description = "Project photo/video upload and management")
public class MediaController {

    private final MediaService mediaService;

    @PostMapping("/admin/projects/{projectId}/media/upload-intent")
    @Operation(summary = "Admin: Request signed upload intent",
            description = "Validates file metadata and returns short-lived signed R2 upload URL.")
    public ApiResponse<UploadIntentResponse> createUploadIntent(
            @PathVariable UUID projectId,
            @Valid @RequestBody UploadIntentRequest request) {
        UploadIntentResponse response = mediaService.createUploadIntent(projectId, request);
        return ApiResponse.ok("Upload intent generated", response);
    }

    @PostMapping("/admin/projects/{projectId}/media/{mediaId}/complete")
    @Operation(summary = "Admin: Confirm upload completion",
            description = "Marks media as successfully uploaded to R2 and activates record.")
    public ApiResponse<MediaDto> completeUpload(
            @PathVariable UUID projectId,
            @PathVariable UUID mediaId) {
        MediaDto media = mediaService.completeUpload(projectId, mediaId);
        return ApiResponse.ok("Media upload confirmed", media);
    }

    @PutMapping("/admin/media/{mediaId}")
    @Operation(summary = "Admin: Update media stage or cover",
            description = "Updates stage (BEFORE, DURING, AFTER, GENERAL) or marks as cover photo.")
    public ApiResponse<MediaDto> updateMedia(
            @PathVariable UUID mediaId,
            @RequestBody UpdateMediaRequest request) {
        MediaDto updated = mediaService.updateMedia(mediaId, request);
        return ApiResponse.ok("Media updated successfully", updated);
    }

    @PutMapping("/admin/projects/{projectId}/media/reorder")
    @Operation(summary = "Admin: Reorder media items",
            description = "Reorders media items for project gallery based on the provided list of IDs.")
    public ApiResponse<Void> reorderMedia(
            @PathVariable UUID projectId,
            @Valid @RequestBody ReorderMediaRequest request) {
        mediaService.reorderMedia(projectId, request);
        return ApiResponse.okMsg("Media order updated successfully");
    }

    @DeleteMapping("/admin/media/{mediaId}")
    @Operation(summary = "Admin: Delete media asset",
            description = "Deletes media metadata and purges the binary object from R2 storage.")
    public ApiResponse<Void> deleteMedia(@PathVariable UUID mediaId) {
        mediaService.deleteMedia(mediaId);
        return ApiResponse.okMsg("Media deleted successfully");
    }
}

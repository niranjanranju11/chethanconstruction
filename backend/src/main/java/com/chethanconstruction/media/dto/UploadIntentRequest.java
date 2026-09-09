package com.chethanconstruction.media.dto;

import com.chethanconstruction.media.MediaStage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadIntentRequest {
    @NotBlank(message = "Filename is required")
    private String filename;

    @NotBlank(message = "Content type is required")
    private String contentType;

    @NotNull(message = "Size in bytes is required")
    private Long sizeBytes;

    @Builder.Default
    private MediaStage stage = MediaStage.GENERAL;
}

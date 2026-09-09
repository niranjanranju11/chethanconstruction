package com.chethanconstruction.media.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadIntentResponse {
    private UUID mediaId;
    private String storageKey;
    private String uploadUrl;
    private long expiresInSeconds;
    private String publicUrl;
}

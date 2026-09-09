package com.chethanconstruction.media.dto;

import com.chethanconstruction.media.MediaStage;
import com.chethanconstruction.media.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaDto {
    private UUID id;
    private UUID projectId;
    private String storageKey;
    private String publicUrl;
    private MediaType mediaType;
    private MediaStage stage;
    private String originalFilename;
    private String mimeType;
    private Long sizeBytes;
    private Integer width;
    private Integer height;
    private BigDecimal durationSeconds;
    private String thumbnailUrl;
    private int displayOrder;
    private boolean cover;
    private Instant createdAt;
}

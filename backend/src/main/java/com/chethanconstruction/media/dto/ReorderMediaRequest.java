package com.chethanconstruction.media.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReorderMediaRequest {
    @NotEmpty(message = "Media IDs list cannot be empty")
    private List<UUID> mediaIds;
}

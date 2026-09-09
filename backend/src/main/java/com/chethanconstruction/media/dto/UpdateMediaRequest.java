package com.chethanconstruction.media.dto;

import com.chethanconstruction.media.MediaStage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMediaRequest {
    private MediaStage stage;
    private Boolean cover;
    private Integer displayOrder;
}

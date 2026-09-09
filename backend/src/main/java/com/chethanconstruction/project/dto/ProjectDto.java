package com.chethanconstruction.project.dto;

import com.chethanconstruction.media.dto.MediaDto;
import com.chethanconstruction.project.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private UUID id;
    private String title;
    private String slug;
    private String shortDescription;
    private String description;
    private String location;
    private String projectType;
    private String area;
    private LocalDate startDate;
    private LocalDate completionDate;
    private ProjectStatus status;
    private boolean featured;
    private boolean published;
    private String seoTitle;
    private String seoDescription;
    private MediaDto coverMedia;
    @Builder.Default
    private List<MediaDto> media = new ArrayList<>();
    private Instant createdAt;
    private Instant updatedAt;
}

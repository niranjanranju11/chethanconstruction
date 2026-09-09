package com.chethanconstruction.project.dto;

import com.chethanconstruction.media.dto.MediaDto;
import com.chethanconstruction.project.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSummaryDto {
    private UUID id;
    private String title;
    private String slug;
    private String shortDescription;
    private String location;
    private String projectType;
    private String area;
    private LocalDate startDate;
    private LocalDate completionDate;
    private ProjectStatus status;
    private boolean featured;
    private boolean published;
    private MediaDto coverMedia;
    private int mediaCount;
    private Instant createdAt;
    private Instant updatedAt;
}

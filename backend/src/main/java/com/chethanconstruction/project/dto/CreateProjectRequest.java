package com.chethanconstruction.project.dto;

import com.chethanconstruction.project.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProjectRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String slug;
    private String shortDescription;
    private String description;
    private String location;
    private String projectType;
    private String area;
    private LocalDate startDate;
    private LocalDate completionDate;

    @NotNull(message = "Project status is required")
    private ProjectStatus status;

    private Boolean featured;
    private Boolean published;
    private String seoTitle;
    private String seoDescription;
}

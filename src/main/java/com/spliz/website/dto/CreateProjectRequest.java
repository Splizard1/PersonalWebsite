package com.spliz.website.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record CreateProjectRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 100, message = "Title must be 100 characters or fewer")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        String techStack,
        String repoUrl,
        String liveUrl,

        @NotNull(message = "Tags are required")
        Set<String> tags
) {}

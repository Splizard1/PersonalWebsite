package com.spliz.website.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record CreatePostRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 100, message = "Title must be 100 characters or fewer")
        String title,

        @NotBlank(message = "Content is required")
        String content,

        @NotBlank(message = "Excerpt is required")
        @Size(max = 500, message = "Excerpt must be 500 characters or fewer")
        String excerpt,

        @NotNull(message = "Tags are required")
        Set<String> tags
) {}

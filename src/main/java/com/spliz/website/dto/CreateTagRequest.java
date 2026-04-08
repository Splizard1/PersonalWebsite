package com.spliz.website.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateTagRequest(
        @NotBlank(message = "Tag name is required")
        @Size(max = 100, message = "Tag name must be 100 characters or fewer")
        String name
) {}

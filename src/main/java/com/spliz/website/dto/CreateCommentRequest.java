package com.spliz.website.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCommentRequest(
        @Size(max = 100, message = "Name must be 100 characters or fewer")
        String name,

        @NotBlank(message = "Comment body is required")
        @Size(max = 2000, message = "Comment must be 2000 characters or fewer")
        String body
) {}

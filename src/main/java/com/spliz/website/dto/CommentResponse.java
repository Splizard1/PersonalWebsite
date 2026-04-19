package com.spliz.website.dto;

import com.spliz.website.entity.Comment;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        String name,
        String body,
        LocalDateTime createTime
) {
    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getName() != null && !comment.getName().isBlank() ? comment.getName() : "Anonymous",
                comment.getBody(),
                comment.getCreateTime()
        );
    }
}

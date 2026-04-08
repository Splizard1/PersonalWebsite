package com.spliz.website.dto;

import com.spliz.website.entity.Post;
import com.spliz.website.entity.Tag;

import java.time.LocalDateTime;
import java.util.Set;

public record PostResponse(
        Long id,
        String title,
        String slug,
        String content,
        String excerpt,
        Boolean published,
        UserSummary author,
        Set<Tag> tags,
        LocalDateTime createTime,
        LocalDateTime updateTime
) {
    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getPostId(),
                post.getTitle(),
                post.getSlug(),
                post.getContent(),
                post.getExcerpt(),
                post.getPublished(),
                UserSummary.from(post.getAuthor()),
                post.getTags(),
                post.getCreateTime(),
                post.getUpdateTime()
        );
    }
}

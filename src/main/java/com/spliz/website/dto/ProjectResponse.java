package com.spliz.website.dto;

import com.spliz.website.entity.Project;
import com.spliz.website.entity.Tag;

import java.time.LocalDateTime;
import java.util.Set;

public record ProjectResponse(
        Long id,
        String title,
        String slug,
        String description,
        String techStack,
        String repoUrl,
        String liveUrl,
        Boolean featured,
        UserSummary author,
        Set<Tag> tags,
        LocalDateTime createTime,
        LocalDateTime updateTime
) {
    public static ProjectResponse from(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getDescription(),
                project.getTechStack(),
                project.getRepoUrl(),
                project.getLiveUrl(),
                project.getFeatured(),
                UserSummary.from(project.getAuthor()),
                project.getTags(),
                project.getCreateTime(),
                project.getUpdateTime()
        );
    }
}

package com.spliz.website.service;

import com.spliz.website.entity.Project;
import com.spliz.website.entity.Tag;
import com.spliz.website.entity.User;
import com.spliz.website.repository.ProjectRepository;
import com.spliz.website.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TagRepository tagRepository;

    public ProjectService(ProjectRepository projectRepository, TagRepository tagRepository) {
        this.projectRepository = projectRepository;
        this.tagRepository = tagRepository;
    }

    public Project createProject(String title, String description, String techStack,
                                 String repoUrl, String liveUrl, Set<String> tagNames, User author) {
        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setTechStack(techStack);
        project.setRepoUrl(repoUrl);
        project.setLiveUrl(liveUrl);
        project.setAuthor(author);
        project.setFeatured(false);

        LocalDateTime now = LocalDateTime.now();
        project.setCreateTime(now);
        project.setUpdateTime(now);

        project.setSlug(generateUniqueSlug(title, null));
        project.setTags(resolveOrCreateTags(tagNames));

        return projectRepository.save(project);
    }

    public Project updateProject(Long id, String title, String description, String techStack,
                                 String repoUrl, String liveUrl, Set<String> tagNames) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        if (!project.getTitle().equals(title)) {
            project.setSlug(generateUniqueSlug(title, project.getId()));
            project.setTitle(title);
        }
        project.setDescription(description);
        project.setTechStack(techStack);
        project.setRepoUrl(repoUrl);
        project.setLiveUrl(liveUrl);
        project.setTags(resolveOrCreateTags(tagNames));
        project.setUpdateTime(LocalDateTime.now());

        return projectRepository.save(project);
    }

    public Project setFeatured(Long id, boolean featured) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        project.setFeatured(featured);
        project.setUpdateTime(LocalDateTime.now());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    public Optional<Project> findBySlug(String slug) {
        return projectRepository.findBySlug(slug);
    }

    public List<Project> findByAuthor(User author) {
        return projectRepository.findByAuthor(author);
    }

    public List<Project> findByTag(Tag tag) {
        return projectRepository.findByTagsContaining(tag);
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public List<Project> findFeatured() {
        return projectRepository.findByFeaturedTrue();
    }

    // Looks up each tag name; creates it (with slug) if it doesn't exist yet.
    private Set<Tag> resolveOrCreateTags(Set<String> tagNames) {
        Set<Tag> tags = new HashSet<>();
        for (String name : tagNames) {
            Tag tag = tagRepository.findByName(name).orElseGet(() -> {
                String slug = name.toLowerCase()
                        .trim()
                        .replaceAll("[^a-z0-9\\s-]", "")
                        .replaceAll("\\s+", "-");
                return tagRepository.save(new Tag(name, slug));
            });
            tags.add(tag);
        }
        return tags;
    }

    // Appends -2, -3, etc. if the base slug is already taken by a different project.
    private String generateUniqueSlug(String title, Long excludeId) {
        String base = title.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        String candidate = base;
        int suffix = 2;
        while (true) {
            Optional<Project> existing = projectRepository.findBySlug(candidate);
            if (existing.isEmpty() || existing.get().getId().equals(excludeId)) {
                return candidate;
            }
            candidate = base + "-" + suffix++;
        }
    }
}

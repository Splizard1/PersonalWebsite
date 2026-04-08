package com.spliz.website.service;

import com.spliz.website.entity.Post;
import com.spliz.website.entity.Tag;
import com.spliz.website.entity.User;
import com.spliz.website.repository.PostRepository;
import com.spliz.website.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    public PostService(PostRepository postRepository, TagRepository tagRepository) {
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
    }

    public Post createPost(String title, String content, String excerpt, Set<String> tagNames, User author) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setExcerpt(excerpt);
        post.setAuthor(author);
        post.setPublished(false);

        LocalDateTime now = LocalDateTime.now();
        post.setCreateTime(now);
        post.setUpdateTime(now);

        post.setSlug(generateUniqueSlug(title, null));
        post.setTags(resolveOrCreateTags(tagNames));

        return postRepository.save(post);
    }

    public Post updatePost(Long id, String title, String content, String excerpt, Set<String> tagNames) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        if (!post.getTitle().equals(title)) {
            post.setSlug(generateUniqueSlug(title, post.getPostId()));
            post.setTitle(title);
        }
        post.setContent(content);
        post.setExcerpt(excerpt);
        post.setTags(resolveOrCreateTags(tagNames));
        post.setUpdateTime(LocalDateTime.now());

        return postRepository.save(post);
    }

    public Post publishPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        post.setPublished(true);
        post.setUpdateTime(LocalDateTime.now());
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    public Optional<Post> findBySlug(String slug) {
        return postRepository.findBySlug(slug);
    }

    public List<Post> findByAuthor(User author) {
        return postRepository.findByAuthor(author);
    }

    public List<Post> findByTag(Tag tag) {
        return postRepository.findByTagsContaining(tag);
    }

    public List<Post> findAllPublished() {
        return postRepository.findByPublishedTrueOrderByCreateTimeDesc();
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

    // Appends -2, -3, etc. if the base slug is already taken by a different post.
    private String generateUniqueSlug(String title, Long excludeId) {
        String base = title.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        String candidate = base;
        int suffix = 2;
        while (true) {
            Optional<Post> existing = postRepository.findBySlug(candidate);
            if (existing.isEmpty() || existing.get().getPostId().equals(excludeId)) {
                return candidate;
            }
            candidate = base + "-" + suffix++;
        }
    }
}

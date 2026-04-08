package com.spliz.website.controller;

import com.spliz.website.dto.CreateTagRequest;
import com.spliz.website.entity.Tag;
import com.spliz.website.service.TagService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Tag> getTagBySlug(@PathVariable String slug) {
        return tagService.getTagBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTag(@Valid @RequestBody CreateTagRequest request) {
        try {
            Tag created = tagService.createTag(request.name());
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}

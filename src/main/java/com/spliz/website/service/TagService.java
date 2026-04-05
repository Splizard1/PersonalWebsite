package com.spliz.website.service;

import com.spliz.website.entity.Tag;
import com.spliz.website.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {

        this.tagRepository = tagRepository;
    }

    // slug generation - When someone creates a tag called "meep meep",
    // the service should automatically generate the slug meep-meep
    // no duplicates
    public Tag createTag(String name) {

        if (tagRepository.findByName(name).isPresent()) {
            throw new RuntimeException("Tag already exists");
        }
        String slug = name.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        Tag tag = new Tag();
        tag.setName(name);
        tag.setSlug(slug);
        return tagRepository.save(tag);
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    public Optional<Tag> getTagBySlug(String slug) {
        return tagRepository.findBySlug(slug);
    }

    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}

package com.spliz.website.repository;

import com.spliz.website.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findBySlug(String slug);
    Optional<Tag> findByName(String name);
}

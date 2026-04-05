package com.spliz.website.repository;

import com.spliz.website.entity.Project;
import com.spliz.website.entity.Tag;
import com.spliz.website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findBySlug(String slug);
    List<Project> findByAuthor(User author);
    List<Project> findByTagsContaining(Tag tag);
    List<Project> findByFeaturedTrue();
    List<Project> findByAuthorAndTagsContaining(User author, Tag tag);

}

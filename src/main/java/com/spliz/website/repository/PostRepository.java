package com.spliz.website.repository;

import com.spliz.website.entity.Post;
import com.spliz.website.entity.Tag;
import com.spliz.website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post,Long> {

    Optional<Post> findBySlug(String slug);
    List<Post> findByAuthor(User author);
    List<Post> findByTags(Set<Tag> tags);
    List<Post> findByAuthorAndTagsContaining(User author, Tag tag);
    List<Post> findByPublishedTrueOrderByCreateTimeDesc();

}

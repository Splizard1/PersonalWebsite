package com.spliz.website.repository;

import com.spliz.website.entity.Comment;
import com.spliz.website.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByCreateTimeAsc(Post post);
}

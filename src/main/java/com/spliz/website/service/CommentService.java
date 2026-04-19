package com.spliz.website.service;

import com.spliz.website.entity.Comment;
import com.spliz.website.entity.Post;
import com.spliz.website.exception.NotFoundException;
import com.spliz.website.repository.CommentRepository;
import com.spliz.website.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public List<Comment> findByPostSlug(String slug) {
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Post not found: " + slug));
        return commentRepository.findByPostOrderByCreateTimeAsc(post);
    }

    public Comment createComment(String slug, String name, String body) {
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Post not found: " + slug));

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setName(name);
        comment.setBody(body);
        comment.setCreateTime(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}

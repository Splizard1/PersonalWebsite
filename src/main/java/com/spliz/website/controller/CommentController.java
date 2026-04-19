package com.spliz.website.controller;

import com.spliz.website.dto.CommentResponse;
import com.spliz.website.dto.CreateCommentRequest;
import com.spliz.website.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{slug}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentResponse> getComments(@PathVariable String slug) {
        return commentService.findByPostSlug(slug).stream()
                .map(CommentResponse::from)
                .toList();
    }

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(@PathVariable String slug,
                                                         @Valid @RequestBody CreateCommentRequest request) {
        CommentResponse created = CommentResponse.from(
                commentService.createComment(slug, request.name(), request.body()));
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

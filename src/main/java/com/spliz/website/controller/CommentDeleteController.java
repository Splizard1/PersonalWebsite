package com.spliz.website.controller;

import com.spliz.website.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentDeleteController {

    private final CommentService commentService;

    public CommentDeleteController(CommentService commentService) {
        this.commentService = commentService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}

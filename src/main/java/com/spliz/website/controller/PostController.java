package com.spliz.website.controller;

import com.spliz.website.dto.CreatePostRequest;
import com.spliz.website.dto.PostResponse;
import com.spliz.website.dto.UpdatePostRequest;
import com.spliz.website.entity.User;
import com.spliz.website.service.PostService;
import com.spliz.website.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    // --- Public ---

    @GetMapping
    public List<PostResponse> getPublishedPosts() {
        return postService.findAllPublished().stream()
                .map(PostResponse::from)
                .toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PostResponse> getPostBySlug(@PathVariable String slug) {
        return postService.findBySlug(slug)
                .map(PostResponse::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{slug}/related")
    public List<PostResponse> getRelatedPosts(@PathVariable String slug) {
        return postService.findRelated(slug, 3).stream()
                .map(PostResponse::from)
                .toList();
    }

    // --- Authenticated ---

    @GetMapping("/admin/all")
    public List<PostResponse> getAllPostsAdmin(@AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        return postService.findAll().stream()
                .map(PostResponse::from)
                .toList();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        return postService.findById(id)
                .map(PostResponse::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody CreatePostRequest request,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        User author = resolveUser(userDetails);
        PostResponse created = PostResponse.from(postService.createPost(
                request.title(), request.content(), request.excerpt(), request.tags(), author));
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long id,
                                                   @Valid @RequestBody UpdatePostRequest request,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        PostResponse updated = PostResponse.from(postService.updatePost(
                id, request.title(), request.content(), request.excerpt(), request.tags()));
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<PostResponse> publishPost(@PathVariable Long id,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        return ResponseEntity.ok(PostResponse.from(postService.publishPost(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    private User resolveUser(UserDetails userDetails) {
        return userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
}

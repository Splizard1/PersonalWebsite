package com.spliz.website.controller;

import com.spliz.website.dto.CreateProjectRequest;
import com.spliz.website.dto.ProjectResponse;
import com.spliz.website.dto.UpdateProjectRequest;
import com.spliz.website.entity.User;
import com.spliz.website.service.ProjectService;
import com.spliz.website.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    public ProjectController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    // --- Public ---

    @GetMapping
    public List<ProjectResponse> getAllProjects() {
        return projectService.findAll().stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @GetMapping("/featured")
    public List<ProjectResponse> getFeaturedProjects() {
        return projectService.findFeatured().stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProjectResponse> getProjectBySlug(@PathVariable String slug) {
        return projectService.findBySlug(slug)
                .map(ProjectResponse::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- Authenticated ---

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody CreateProjectRequest request,
                                                         @AuthenticationPrincipal UserDetails userDetails) {
        User author = resolveUser(userDetails);
        ProjectResponse created = ProjectResponse.from(projectService.createProject(
                request.title(), request.description(), request.techStack(),
                request.repoUrl(), request.liveUrl(), request.tags(), author));
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long id,
                                                         @Valid @RequestBody UpdateProjectRequest request,
                                                         @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        ProjectResponse updated = ProjectResponse.from(projectService.updateProject(
                id, request.title(), request.description(), request.techStack(),
                request.repoUrl(), request.liveUrl(), request.tags()));
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/feature")
    public ResponseEntity<ProjectResponse> setFeatured(@PathVariable Long id,
                                                       @RequestParam boolean featured,
                                                       @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        return ResponseEntity.ok(ProjectResponse.from(projectService.setFeatured(id, featured)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id,
                                              @AuthenticationPrincipal UserDetails userDetails) {
        resolveUser(userDetails);
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    private User resolveUser(UserDetails userDetails) {
        return userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
}

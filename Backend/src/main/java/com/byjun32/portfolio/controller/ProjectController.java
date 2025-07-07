package com.byjun32.portfolio.controller;

import com.byjun32.portfolio.dto.ProjectDto;
import com.byjun32.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // 모든 프로젝트 조회
    @GetMapping
    public ResponseEntity<List<ProjectDto.Response>> getAllProjects() {
        List<ProjectDto.Response> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    // 특정 프로젝트 조회
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto.Response> getProjectById(@PathVariable Long id) {
        ProjectDto.Response project = projectService.getProjectById(id);
        return ResponseEntity.ok(project);
    }

    // 프로젝트 생성
    @PostMapping
    public ResponseEntity<ProjectDto.Response> createProject(@RequestBody ProjectDto.Request request) {
        ProjectDto.Response createdProject = projectService.createProject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    // 프로젝트 수정
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto.Response> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectDto.Request request) {
        ProjectDto.Response updatedProject = projectService.updateProject(id, request);
        return ResponseEntity.ok(updatedProject);
    }

    // 프로젝트 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    // 제목으로 프로젝트 검색
    @GetMapping("/search")
    public ResponseEntity<List<ProjectDto.Response>> searchProjects(@RequestParam String title) {
        List<ProjectDto.Response> projects = projectService.searchProjectsByTitle(title);
        return ResponseEntity.ok(projects);
    }

    // 서버 상태 확인용 간단한 엔드포인트
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Portfolio API is running!");
    }
}

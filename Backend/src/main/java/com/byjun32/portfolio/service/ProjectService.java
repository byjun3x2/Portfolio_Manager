package com.byjun32.portfolio.service;

import com.byjun32.portfolio.dto.ProjectDto;
import com.byjun32.portfolio.entity.Project;
import com.byjun32.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    // 모든 프로젝트 조회
    public List<ProjectDto.Response> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 특정 프로젝트 조회
    public ProjectDto.Response getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다. ID: " + id));
        return convertToDto(project);
    }

    // 프로젝트 생성
    @Transactional
    public ProjectDto.Response createProject(ProjectDto.Request request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .period(request.getPeriod())
                .techStack(request.getTechStack())
                .projectUrl(request.getProjectUrl())
                .githubUrl(request.getGithubUrl())
                .thumbnailUrl(request.getThumbnailUrl())
                .build();

        Project savedProject = projectRepository.save(project);
        return convertToDto(savedProject);
    }

    // 프로젝트 수정
    @Transactional
    public ProjectDto.Response updateProject(Long id, ProjectDto.Request request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다. ID: " + id));

        // 업데이트 로직 (실제로는 Project 엔티티에 update 메서드를 만드는 것이 좋습니다)
        Project updatedProject = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .period(request.getPeriod())
                .techStack(request.getTechStack())
                .projectUrl(request.getProjectUrl())
                .githubUrl(request.getGithubUrl())
                .thumbnailUrl(request.getThumbnailUrl())
                .build();

        Project savedProject = projectRepository.save(updatedProject);
        return convertToDto(savedProject);
    }

    // 프로젝트 삭제
    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("프로젝트를 찾을 수 없습니다. ID: " + id);
        }
        projectRepository.deleteById(id);
    }

    // 제목으로 프로젝트 검색
    public List<ProjectDto.Response> searchProjectsByTitle(String title) {
        return projectRepository.findByTitleContaining(title)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Entity를 DTO로 변환하는 헬퍼 메서드
    private ProjectDto.Response convertToDto(Project project) {
        return ProjectDto.Response.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .period(project.getPeriod())
                .techStack(project.getTechStack())
                .projectUrl(project.getProjectUrl())
                .githubUrl(project.getGithubUrl())
                .thumbnailUrl(project.getThumbnailUrl())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}

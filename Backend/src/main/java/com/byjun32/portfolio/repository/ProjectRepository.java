package com.byjun32.portfolio.repository;

import com.byjun32.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 제목으로 프로젝트 검색
    List<Project> findByTitleContaining(String title);

    // 기술 스택으로 프로젝트 검색
    List<Project> findByTechStackContaining(String techStack);

    // 생성일 기준 최신순 정렬
    List<Project> findAllByOrderByCreatedAtDesc();
}

package com.byjun32.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "project")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String period;

    @Column(length = 255)
    private String techStack;

    @Column(length = 255)
    private String projectUrl;

    @Column(length = 255)
    private String githubUrl;

    @Column(length = 255)
    private String thumbnailUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    public Project(String title, String description, String period,
                   String techStack, String projectUrl, String githubUrl,
                   String thumbnailUrl) {
        this.title = title;
        this.description = description;
        this.period = period;
        this.techStack = techStack;
        this.projectUrl = projectUrl;
        this.githubUrl = githubUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}

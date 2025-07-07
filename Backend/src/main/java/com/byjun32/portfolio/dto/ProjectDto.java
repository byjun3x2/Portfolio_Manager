package com.byjun32.portfolio.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ProjectDto {

    @Getter
    @NoArgsConstructor
    public static class Request {
        private String title;
        private String description;
        private String period;
        private String techStack;
        private String projectUrl;
        private String githubUrl;
        private String thumbnailUrl;

        @Builder
        public Request(String title, String description, String period,
                       String techStack, String projectUrl, String githubUrl,
                       String thumbnailUrl) {
            this.title = title;
            this.description = description;
            this.period = period;
            this.techStack = techStack;
            this.projectUrl = projectUrl;
            this.githubUrl = githubUrl;
            this.thumbnailUrl = thumbnailUrl;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String title;
        private String description;
        private String period;
        private String techStack;
        private String projectUrl;
        private String githubUrl;
        private String thumbnailUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        @Builder
        public Response(Long id, String title, String description, String period,
                        String techStack, String projectUrl, String githubUrl,
                        String thumbnailUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.period = period;
            this.techStack = techStack;
            this.projectUrl = projectUrl;
            this.githubUrl = githubUrl;
            this.thumbnailUrl = thumbnailUrl;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }
}

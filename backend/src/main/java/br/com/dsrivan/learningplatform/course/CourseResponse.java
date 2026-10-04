package br.com.dsrivan.learningplatform.course;

import java.time.Instant;

public record CourseResponse(
        Long id,
        String name,
        String description,
        Instant createdAt,
        Instant updatedAt
) {
    public static CourseResponse from(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.getCreatedAt(),
                course.getUpdatedAt()
        );
    }
}

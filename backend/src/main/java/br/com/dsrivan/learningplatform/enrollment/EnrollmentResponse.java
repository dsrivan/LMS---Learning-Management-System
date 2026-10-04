package br.com.dsrivan.learningplatform.enrollment;

import java.time.Instant;
import java.time.LocalDate;

public record EnrollmentResponse(
        Long id,
        Long studentId,
        Long courseId,
        Instant enrolledAt,
        LocalDate completionDeadline,
        Instant completedAt,
        EnrollmentStatus status
) {

    public static EnrollmentResponse from(Enrollment enrollment) {
        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getStudent().getId(),
                enrollment.getCourse().getId(),
                enrollment.getEnrolledAt(),
                enrollment.getCompletionDeadline(),
                enrollment.getCompletedAt(),
                enrollment.getStatus()
        );
    }
}

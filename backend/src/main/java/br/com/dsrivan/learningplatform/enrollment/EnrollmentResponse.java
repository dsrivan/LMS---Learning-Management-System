package br.com.dsrivan.learningplatform.enrollment;

import br.com.dsrivan.learningplatform.course.CourseResponse;

import java.time.Instant;
import java.time.LocalDate;

public record EnrollmentResponse(
        Long id,
        Long studentId,
        CourseResponse course,
        Instant enrolledAt,
        LocalDate completionDeadline,
        Instant completedAt,
        EnrollmentStatus status
) {

    public static EnrollmentResponse from(Enrollment enrollment) {
        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getStudent().getId(),
                CourseResponse.from(enrollment.getCourse()),
                enrollment.getEnrolledAt(),
                enrollment.getCompletionDeadline(),
                enrollment.getCompletedAt(),
                enrollment.getStatus()
        );
    }
}
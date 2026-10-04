package br.com.dsrivan.learningplatform.enrollment;

import jakarta.validation.constraints.NotNull;

public record EnrollmentRequest(

        @NotNull
        Long studentId,

        @NotNull
        Long courseId
) {
}

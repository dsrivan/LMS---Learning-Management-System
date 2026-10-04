package br.com.dsrivan.learningplatform.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CourseRequest(
        @NotBlank
        @Size(max = 150)
        String name,

        @Size(max = 10000)
        String description
) {
}

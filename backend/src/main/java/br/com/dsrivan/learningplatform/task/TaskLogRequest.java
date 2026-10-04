package br.com.dsrivan.learningplatform.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record TaskLogRequest(

        @NotNull
        Long enrollmentId,

        @NotNull
        TaskCategory category,

        @NotBlank
        @Size(max = 10000)
        String description,

        @NotNull
        Instant startedAt,

        @NotNull
        Instant endedAt
) {
}

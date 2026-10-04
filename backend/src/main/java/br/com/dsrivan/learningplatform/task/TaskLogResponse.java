package br.com.dsrivan.learningplatform.task;

import java.time.Instant;

public record TaskLogResponse(
        Long id,
        Long enrollmentId,
        TaskCategory category,
        String description,
        Instant startedAt,
        Instant endedAt
) {

    public static TaskLogResponse from(TaskLog taskLog) {
        return new TaskLogResponse(
                taskLog.getId(),
                taskLog.getEnrollment().getId(),
                taskLog.getCategory(),
                taskLog.getDescription(),
                taskLog.getStartedAt(),
                taskLog.getEndedAt()
        );
    }
}

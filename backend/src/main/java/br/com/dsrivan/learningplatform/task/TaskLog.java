package br.com.dsrivan.learningplatform.task;

import br.com.dsrivan.learningplatform.enrollment.Enrollment;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "task_logs")
public class TaskLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TaskCategory category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "started_at", nullable = false)
    private Instant startedAt;

    @Column(name = "ended_at", nullable = false)
    private Instant endedAt;

    protected TaskLog() {
    }

    public TaskLog(
            Enrollment enrollment,
            TaskCategory category,
            String description,
            Instant startedAt,
            Instant endedAt) {

        this.enrollment = enrollment;
        this.category = category;
        this.description = description;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
    }

    public void update(
            TaskCategory category,
            String description,
            Instant startedAt,
            Instant endedAt) {

        this.category = category;
        this.description = description;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
    }

    public Long getId() {
        return id;
    }

    public Enrollment getEnrollment() {
        return enrollment;
    }

    public TaskCategory getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public Instant getEndedAt() {
        return endedAt;
    }
}

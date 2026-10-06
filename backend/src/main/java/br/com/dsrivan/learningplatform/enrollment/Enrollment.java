package br.com.dsrivan.learningplatform.enrollment;

import br.com.dsrivan.learningplatform.course.Course;
import br.com.dsrivan.learningplatform.user.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(
        name = "enrollments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_enrollments_student_course",
                        columnNames = {"student_id", "course_id"}
                )
        }
)
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "enrolled_at", nullable = false)
    private Instant enrolledAt;

    @Column(name = "completion_deadline", nullable = false)
    private LocalDate completionDeadline;

    @Column(name = "completed_at")
    private Instant completedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EnrollmentStatus status;

    protected Enrollment() {
    }

    public Enrollment(
            User student,
            Course course,
            Instant enrolledAt,
            LocalDate completionDeadline) {

        this.student = student;
        this.course = course;
        this.enrolledAt = enrolledAt;
        this.completionDeadline = completionDeadline;
        this.status = EnrollmentStatus.ACTIVE;
    }

    public Long getId() {
        return id;
    }

    public User getStudent() {
        return student;
    }

    public Course getCourse() {
        return course;
    }

    public Instant getEnrolledAt() {
        return enrolledAt;
    }

    public LocalDate getCompletionDeadline() {
        return completionDeadline;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public EnrollmentStatus getStatus() {
        return status;
    }

    public void complete() {
        this.status = EnrollmentStatus.COMPLETED;
        this.completedAt = Instant.now();
    }
}

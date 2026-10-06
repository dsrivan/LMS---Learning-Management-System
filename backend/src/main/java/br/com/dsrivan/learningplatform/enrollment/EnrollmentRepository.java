package br.com.dsrivan.learningplatform.enrollment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    boolean existsByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );

    long countByStudentIdAndStatus(
            Long studentId,
            EnrollmentStatus status
    );

    @Query("""
            SELECT e
            FROM Enrollment e
            JOIN FETCH e.course
            WHERE e.student.id = :studentId
            """)
    List<Enrollment> findByStudentIdWithCourse(Long studentId);
}
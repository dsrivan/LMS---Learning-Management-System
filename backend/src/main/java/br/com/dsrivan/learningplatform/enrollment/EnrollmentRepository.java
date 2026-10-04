package br.com.dsrivan.learningplatform.enrollment;

import org.springframework.data.jpa.repository.JpaRepository;

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

    List<Enrollment> findByStudentId(Long studentId);
}

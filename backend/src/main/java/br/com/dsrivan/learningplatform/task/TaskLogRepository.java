package br.com.dsrivan.learningplatform.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskLogRepository extends JpaRepository<TaskLog, Long> {

    List<TaskLog> findByEnrollmentId(Long enrollmentId);
}

package br.com.dsrivan.learningplatform.task;

import br.com.dsrivan.learningplatform.enrollment.Enrollment;
import br.com.dsrivan.learningplatform.enrollment.EnrollmentRepository;
import br.com.dsrivan.learningplatform.enrollment.EnrollmentStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class TaskLogService {

    private final TaskLogRepository repository;
    private final EnrollmentRepository enrollmentRepository;

    public TaskLogService(
            TaskLogRepository repository,
            EnrollmentRepository enrollmentRepository) {

        this.repository = repository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Transactional(readOnly = true)
    public List<TaskLogResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(TaskLogResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TaskLogResponse findById(Long id) {
        return TaskLogResponse.from(getTaskLog(id));
    }

    @Transactional(readOnly = true)
    public List<TaskLogResponse> findByEnrollment(Long enrollmentId) {
        getEnrollment(enrollmentId);

        return repository.findByEnrollmentId(enrollmentId)
                .stream()
                .map(TaskLogResponse::from)
                .toList();
    }

    @Transactional
    public TaskLogResponse create(TaskLogRequest request) {
        Enrollment enrollment = getActiveEnrollment(request.enrollmentId());

        validateTimeRange(request.startedAt(), request.endedAt());

        TaskLog taskLog = new TaskLog(
                enrollment,
                request.category(),
                request.description().trim(),
                request.startedAt(),
                request.endedAt()
        );

        return TaskLogResponse.from(repository.save(taskLog));
    }

    @Transactional
    public TaskLogResponse update(Long id, TaskLogRequest request) {
        TaskLog taskLog = getTaskLog(id);

        if (!taskLog.getEnrollment().getId().equals(request.enrollmentId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Enrollment cannot be changed when updating a task log"
            );
        }

        getActiveEnrollment(request.enrollmentId());

        validateTimeRange(request.startedAt(), request.endedAt());

        taskLog.update(
                request.category(),
                request.description().trim(),
                request.startedAt(),
                request.endedAt()
        );

        return TaskLogResponse.from(repository.save(taskLog));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getTaskLog(id));
    }

    private TaskLog getTaskLog(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Task log not found: " + id
                ));
    }

    private Enrollment getEnrollment(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Enrollment not found: " + id
                ));
    }

    private Enrollment getActiveEnrollment(Long id) {
        Enrollment enrollment = getEnrollment(id);

        if (enrollment.getStatus() != EnrollmentStatus.ACTIVE) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Tasks can only be logged for active enrollments"
            );
        }

        return enrollment;
    }

    private void validateTimeRange(
            Instant startedAt,
            Instant endedAt) {

        if (!endedAt.isAfter(startedAt)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "endedAt must be after startedAt"
            );
        }
    }
}

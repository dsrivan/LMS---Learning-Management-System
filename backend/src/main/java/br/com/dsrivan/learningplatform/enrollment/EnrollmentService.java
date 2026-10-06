package br.com.dsrivan.learningplatform.enrollment;

import br.com.dsrivan.learningplatform.course.Course;
import br.com.dsrivan.learningplatform.course.CourseRepository;
import br.com.dsrivan.learningplatform.user.User;
import br.com.dsrivan.learningplatform.user.UserRepository;
import br.com.dsrivan.learningplatform.user.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class EnrollmentService {

    private static final int MAX_ACTIVE_ENROLLMENTS = 3;
    private static final int COMPLETION_MONTHS = 6;

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            UserRepository userRepository,
            CourseRepository courseRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @Transactional(readOnly = true)
    public List<EnrollmentResponse> findAll() {
        return enrollmentRepository.findAll()
                .stream()
                .map(EnrollmentResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public EnrollmentResponse findById(Long id) {
        return EnrollmentResponse.from(getEnrollment(id));
    }

    @Transactional(readOnly = true)
    public List<EnrollmentResponse> findByStudent(Long studentId) {
        getStudent(studentId);

        return enrollmentRepository.findByStudentIdWithCourse(studentId)
                .stream()
                .map(EnrollmentResponse::from)
                .toList();
    }

    @Transactional
    public EnrollmentResponse create(EnrollmentRequest request) {

        User student = getStudent(request.studentId());
        Course course = getCourse(request.courseId());

        if (enrollmentRepository.existsByStudentIdAndCourseId(
                request.studentId(),
                request.courseId())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Student is already enrolled in this course: " + request.courseId()
            );
        }

        long activeEnrollments =
                enrollmentRepository.countByStudentIdAndStatus(
                        request.studentId(),
                        EnrollmentStatus.ACTIVE
                );

        if (activeEnrollments >= MAX_ACTIVE_ENROLLMENTS) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Student cannot have more than 3 active enrollments: " + request.studentId()
            );
        }

        Instant enrolledAt = Instant.now();

        LocalDate completionDeadline = enrolledAt
                .atZone(ZoneOffset.UTC)
                .toLocalDate()
                .plusMonths(COMPLETION_MONTHS);

        Enrollment enrollment = new Enrollment(
                student,
                course,
                enrolledAt,
                completionDeadline
        );

        return EnrollmentResponse.from(
                enrollmentRepository.save(enrollment)
        );
    }

    @Transactional
    public void delete(Long id) {
        Enrollment enrollment = getEnrollment(id);
        enrollmentRepository.delete(enrollment);
    }

    @Transactional
    public EnrollmentResponse complete(Long id) {
        Enrollment enrollment = getEnrollment(id);

        if (enrollment.getStatus() != EnrollmentStatus.ACTIVE) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Only active enrollments can be completed: " + id
            );
        }

        enrollment.complete();

        return EnrollmentResponse.from(
                enrollmentRepository.save(enrollment)
        );
    }

    private Enrollment getEnrollment(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Enrollment not found: " + id
                ));
    }

    private User getStudent(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found: " + id
                ));

        if (user.getRole() != UserRole.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not a student: " + id
            );
        }

        return user;
    }

    private Course getCourse(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Course not found: " + id
                ));
    }
}
package br.com.dsrivan.learningplatform.student;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<StudentResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(StudentResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public StudentResponse findById(Long id) {
        return StudentResponse.from(getStudent(id));
    }

    @Transactional
    public StudentResponse create(StudentRequest request) {
        validateAge(request.birthDate());

        String email = request.email().trim().toLowerCase();

        if (repository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A student with this email already exists: " + email
            );
        }

        Student student = new Student(
                request.firstName().trim(),
                request.lastName().trim(),
                request.birthDate(),
                email,
                request.phone().trim()
        );

        return StudentResponse.from(repository.save(student));
    }

    @Transactional
    public StudentResponse update(Long id, StudentRequest request) {
        Student student = getStudent(id);

        validateAge(request.birthDate());

        String email = request.email().trim().toLowerCase();

        if (repository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A student with this email already exists: " + email
            );
        }

        student.update(
                request.firstName().trim(),
                request.lastName().trim(),
                request.birthDate(),
                email,
                request.phone().trim()
        );

        return StudentResponse.from(repository.save(student));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getStudent(id));
    }

    private Student getStudent(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found: " + id
                ));
    }

    private void validateAge(LocalDate birthDate) {
        int age = Period.between(birthDate, LocalDate.now()).getYears();

        if (age < 16) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Student must be at least 16 years old"
            );
        }
    }
}

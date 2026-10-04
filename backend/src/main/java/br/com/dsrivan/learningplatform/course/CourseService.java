package br.com.dsrivan.learningplatform.course;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(CourseResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseResponse findById(Long id) {
        return CourseResponse.from(getCourse(id));
    }

    @Transactional
    public CourseResponse create(CourseRequest request) {
        if (repository.existsByNameIgnoreCase(request.name().trim())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A course with this name already exists: " + request.name().trim()
            );
        }

        Course course = new Course(
                request.name().trim(),
                request.description().trim()
        );

        return CourseResponse.from(repository.save(course));
    }

    @Transactional
    public CourseResponse update(Long id, CourseRequest request) {
        Course course = getCourse(id);

        if (repository.existsByNameIgnoreCaseAndIdNot(
                request.name(), id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A course with this name already exists: " + request.name().trim()
            );
        }

        course.update(
                request.name().trim(),
                request.description().trim()
        );

        return CourseResponse.from(repository.save(course));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(getCourse(id));
    }

    private Course getCourse(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Course not found: " + id
                ));
    }
}

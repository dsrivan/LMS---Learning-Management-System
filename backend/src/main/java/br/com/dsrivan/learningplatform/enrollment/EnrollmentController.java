package br.com.dsrivan.learningplatform.enrollment;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/enrollments")
@Tag(name = "Enrollments", description = "Endpoints for managing enrollments")
public class EnrollmentController {

    private final EnrollmentService service;

    public EnrollmentController(EnrollmentService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "List all enrollments")
    public ResponseEntity<List<EnrollmentResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an enrollment by ID")
    public ResponseEntity<EnrollmentResponse> findById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/student/{studentId}")
    @Operation(summary = "List enrollments by student")
    public ResponseEntity<List<EnrollmentResponse>> findByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(service.findByStudent(studentId));
    }

    @PostMapping
    @Operation(summary = "Create an enrollment")
    public ResponseEntity<EnrollmentResponse> create(
            @Valid @RequestBody EnrollmentRequest request) {

        EnrollmentResponse enrollment = service.create(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(enrollment.id())
                .toUri();

        return ResponseEntity.created(location).body(enrollment);
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Complete an enrollment")
    public ResponseEntity<EnrollmentResponse> complete(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.complete(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an enrollment")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

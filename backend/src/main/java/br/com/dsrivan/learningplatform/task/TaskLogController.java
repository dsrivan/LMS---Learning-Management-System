package br.com.dsrivan.learningplatform.task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task Logs", description = "Endpoints for managing task logs")
public class TaskLogController {

    private final TaskLogService service;

    public TaskLogController(TaskLogService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "List all task logs")
    public ResponseEntity<List<TaskLogResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a task log by ID")
    public ResponseEntity<TaskLogResponse> findById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/enrollment/{enrollmentId}")
    @Operation(summary = "List task logs by enrollment")
    public ResponseEntity<List<TaskLogResponse>> findByEnrollment(
            @PathVariable Long enrollmentId) {

        return ResponseEntity.ok(
                service.findByEnrollment(enrollmentId)
        );
    }

    @PostMapping
    @Operation(summary = "Create a task log")
    public ResponseEntity<TaskLogResponse> create(
            @Valid @RequestBody TaskLogRequest request) {

        TaskLogResponse taskLog = service.create(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(taskLog.id())
                .toUri();

        return ResponseEntity.created(location).body(taskLog);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a task log")
    public ResponseEntity<TaskLogResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody TaskLogRequest request) {

        return ResponseEntity.ok(
                service.update(id, request)
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a task log")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

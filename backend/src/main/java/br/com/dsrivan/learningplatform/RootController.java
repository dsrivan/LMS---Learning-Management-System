package br.com.dsrivan.learningplatform;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/")
@Tag(name = "Health Check", description = "API health check and basic information")
public class RootController {

    @Value("${spring.application.name}")
    private String appName;

    @Value("${spring.application.description}")
    private String appDescription;

    @Value("${spring.application.version}")
    private String appVersion;

    @GetMapping("/")
    @Operation(
            summary = "API health check",
            description = "Returns basic information about the API and its current status"
    )
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "name", appName,
                "description", appDescription,
                "version", appVersion,
                "status", "UP"
        ));
    }
}

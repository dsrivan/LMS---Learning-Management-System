package br.com.dsrivan.learningplatform.auth;

public record LoginResponse(
        String token,
        String email,
        UserRole role
) {
}

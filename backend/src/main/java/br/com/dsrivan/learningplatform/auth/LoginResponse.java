package br.com.dsrivan.learningplatform.auth;

import br.com.dsrivan.learningplatform.user.UserRole;

public record LoginResponse(
        Long userId,
        String token,
        String email,
        UserRole role
) {
}
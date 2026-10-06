package br.com.dsrivan.learningplatform.user.dto;

import br.com.dsrivan.learningplatform.user.User;

import java.time.LocalDate;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        LocalDate birthDate,
        String email,
        String phone
) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getBirthDate(),
                user.getEmail(),
                user.getPhone()
        );
    }
}
package br.com.dsrivan.learningplatform.user.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UserRequest(

        @NotBlank(message = "First name is required.")
        @Size(max = 100, message = "First name must have at most 100 characters.")
        String firstName,

        @NotBlank(message = "Last name is required.")
        @Size(max = 100, message = "Last name must have at most 100 characters.")
        String lastName,

        @NotNull(message = "Birth date is required.")
        @Past(message = "Birth date must be in the past.")
        LocalDate birthDate,

        @NotBlank(message = "Email is required.")
        @Email(message = "Email must be valid.")
        String email,

        @NotBlank(message = "Phone is required.")
        @Size(max = 30, message = "Phone must have at most 30 characters.")
        String phone,

        @NotBlank(message = "Password is required.")
        @Size(min = 6, max = 100, message = "Password must have between 6 and 100 characters.")
        String password
) {
}
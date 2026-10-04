package br.com.dsrivan.learningplatform.student;

import java.time.LocalDate;

public record StudentResponse(
        Long id,
        String firstName,
        String lastName,
        LocalDate birthDate,
        String email,
        String phone
) {

    public static StudentResponse from(Student student) {
        return new StudentResponse(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getBirthDate(),
                student.getEmail(),
                student.getPhone()
        );
    }
}

package br.com.dsrivan.learningplatform.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UsersInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (userRepository
                .findByEmailIgnoreCase("admin@learning.com")
                .isEmpty()) {

            userRepository.save(
                    new User(
                            "admin@learning.com",
                            passwordEncoder.encode("admin123"),
                            UserRole.ADMIN
                    )
            );
        }

        if (userRepository
                .findByEmailIgnoreCase("user@learning.com")
                .isEmpty()) {

            userRepository.save(
                    new User(
                            "user@learning.com",
                            passwordEncoder.encode("user123"),
                            UserRole.STUDENT
                    )
            );
        }
    }
}
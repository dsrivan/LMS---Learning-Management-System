package br.com.dsrivan.learningplatform.user;

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

        createAdmin();
        createStudent();
    }

    private void createAdmin() {

        if (userRepository.existsByEmailIgnoreCase("admin@learning.com")) {
            return;
        }

        User admin = new User();

        admin.setFirstName("Admin");
        admin.setLastName("Learning");
        admin.setBirthDate(java.time.LocalDate.of(1990, 1, 1));
        admin.setEmail("admin@learning.com");
        admin.setPhone("000000000");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(UserRole.ADMIN);

        userRepository.save(admin);
    }

    private void createStudent() {

        if (userRepository.existsByEmailIgnoreCase("estudante@learning.com")) {
            return;
        }

        User user = new User();

        user.setFirstName("Estudante");
        user.setLastName("Learning");
        user.setBirthDate(java.time.LocalDate.of(2000, 1, 1));
        user.setEmail("estudante@learning.com");
        user.setPhone("000000000");
        user.setPassword(passwordEncoder.encode("estudante123"));
        user.setRole(UserRole.STUDENT);

        userRepository.save(user);
    }
}
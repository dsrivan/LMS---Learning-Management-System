package br.com.dsrivan.learningplatform.user;

import br.com.dsrivan.learningplatform.user.dto.UserRequest;
import br.com.dsrivan.learningplatform.user.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
public class UserService {

    private static final int MINIMUM_AGE = 16;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse create(UserRequest request) {

        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered."
            );
        }

        if (request.birthDate().isAfter(
                LocalDate.now().minusYears(MINIMUM_AGE))) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Estudante deve ter pelo menos 16 anos."
            );
        }

        User user = new User();

        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setBirthDate(request.birthDate());
        user.setEmail(request.email().trim());
        user.setPhone(request.phone().trim());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.STUDENT);

        User savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }
}
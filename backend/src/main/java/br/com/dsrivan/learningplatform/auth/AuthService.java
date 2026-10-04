package br.com.dsrivan.learningplatform.auth;

import br.com.dsrivan.learningplatform.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        System.out.println("LOGIN 1 - início");

        User user = userRepository
                .findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        System.out.println("LOGIN 2 - usuário encontrado: " + user.getEmail());
        System.out.println("LOGIN 3 - role: " + user.getRole());

        boolean passwordMatches = passwordEncoder.matches(
                request.password(),
                user.getPassword()
        );

        System.out.println("LOGIN 4 - senha validada: " + passwordMatches);

        if (!passwordMatches) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        System.out.println("LOGIN 5 - gerando JWT");

        String token = jwtService.generateToken(user);

        System.out.println("LOGIN 6 - JWT gerado");

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole()
        );
    }
}
package fr.interview.backend.services;

import fr.interview.backend.entities.User;
import fr.interview.backend.repositories.UserRepository;
import fr.interview.backend.payload.request.RegisterRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

// UserService.java (implements UserDetailsService)
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    private final EmailService emailService;
    private final VerificationTokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

    public Optional<User> findUserById(Long id){
        return userRepo.findById(id);
    }

    @Transactional
    public void registerUser(RegisterRequest req) {
        if (userRepo.existsByEmail(req.email())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .email(req.email())
                .password(passwordEncoder.encode(req.password()))
                .enabled(false)
                .build();

        userRepo.save(user);

        // GENERATE TOKEN + SEND EMAIL
        String token = tokenService.createTokenForUser(user); // or UUID.randomUUID().toString()

        String activationLink = "http://localhost:9090/api/auth/activate?token=" + token;

        emailService.sendVerificationEmail(user.getEmail(), activationLink);
    }
}
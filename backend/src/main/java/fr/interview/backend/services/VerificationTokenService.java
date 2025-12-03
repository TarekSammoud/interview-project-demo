package fr.interview.backend.services;

import fr.interview.backend.entities.User;
import fr.interview.backend.entities.VerificationToken;
import fr.interview.backend.repositories.UserRepository;
import fr.interview.backend.repositories.VerificationTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

// VerificationTokenService.java
@Service
@RequiredArgsConstructor
@Transactional
public class VerificationTokenService {

    @Autowired
     VerificationTokenRepository repo;
    @Autowired
    UserRepository userRepo;

    public String createTokenForUser(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken vt = new VerificationToken();
        vt.setToken(token);
        vt.setUser(user);
        repo.save(vt);
        return token;
    }

    public void activateUser(String token) {
        VerificationToken vt = repo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (vt.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = vt.getUser();
        user.setEnabled(true);
        userRepo.save(user);
        repo.delete(vt);
    }
}
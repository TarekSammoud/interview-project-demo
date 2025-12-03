package fr.interview.backend.services;


import fr.interview.backend.entities.RefreshToken;
import fr.interview.backend.entities.User;
import fr.interview.backend.repositories.RefreshTokenRepository;
import fr.interview.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

// RefreshTokenService.java
@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenService {

    @Autowired
    RefreshTokenRepository repo;
    @Autowired
    UserRepository userRepo;

    @Value("${jwt.refresh-expiration:604800000}") // 7 days default
    private long refreshExpiration;

    public RefreshToken createRefreshToken(String username) {
        User user = userRepo.findByEmail(username).orElseThrow();
        RefreshToken token = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshExpiration))
                .build();
        return repo.save(token);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return repo.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            repo.delete(token);
            throw new RuntimeException("Refresh token expired");
        }
        return token;
    }

    public void deleteByUsername(String username) {
        User user = userRepo.findByEmail(username).orElseThrow();
        repo.deleteByUser(user);
    }
}

// src/main/java/fr/eseo/ld/ts/td/controllers/AuthController.java
package fr.interview.backend.controllers;


import fr.interview.backend.payload.request.LoginRequest;
import fr.interview.backend.payload.request.RegisterRequest;
import fr.interview.backend.payload.request.TokenRefreshRequest;
import fr.interview.backend.payload.response.AuthResponse;
import fr.interview.backend.payload.response.MessageResponse;
import fr.interview.backend.services.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            RefreshTokenService refreshTokenService,
            UserService userService,
            VerificationTokenService verificationTokenService,
            EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
        this.verificationTokenService = verificationTokenService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        userService.registerUser(request);
        return ResponseEntity.ok(new MessageResponse("User registered. Check your email to activate."));
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestParam("token") String token) {
        verificationTokenService.activateUser(token);
        return ResponseEntity.ok(new MessageResponse("Account activated successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername()).getToken();

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        return refreshTokenService.findByToken(request.refreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {
                    String username = refreshToken.getUser().getEmail();
                    UserDetails userDetails = userService.loadUserByUsername(username);
                    String newAccessToken = jwtService.generateToken(userDetails);
                    return new AuthResponse(newAccessToken, refreshToken.getToken());
                })
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest()
                        .body(new AuthResponse(null, null))); // or throw exception
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetails userDetails) {
        refreshTokenService.deleteByUsername(userDetails.getUsername());
        return ResponseEntity.ok(new MessageResponse("Logged out successfully"));
    }
}
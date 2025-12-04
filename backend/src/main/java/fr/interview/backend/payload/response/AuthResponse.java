package fr.interview.backend.payload.response;

public record AuthResponse(String accessToken, String refreshToken,Long userId) {}

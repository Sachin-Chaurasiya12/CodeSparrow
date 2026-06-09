package com.example.ProfileService.security;

public record UserPrincipal(
        Long userId,
        String email,
        String username
) {}
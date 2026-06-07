package com.example.ProfileService.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.ProfileService.security.UserPrincipal;

import com.example.ProfileService.service.JwtService;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtUtil;

    public JwtFilter(JwtService jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // No token → skip, Spring Security will handle as unauthenticated
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7); // strip "Bearer "

        if (!jwtUtil.isTokenValid(token)) {
            // Invalid/expired token → reject immediately
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Invalid or expired token\", \"status\": 401}");
            return;
        }

        // Extract identity from token
        String email = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractRole(token);
        Long userId = jwtUtil.extractUserId(token);
        // Map roles to Spring Security authorities — ROLE_ prefix required
        List<SimpleGrantedAuthority> authorities = List.of(
        new SimpleGrantedAuthority(
                role.startsWith("ROLE_")
                        ? role
                        : "ROLE_" + role
        )
        );
        

        // Build authentication object and set in security context
        UserPrincipal principal =
        new UserPrincipal(userId, email);

    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(
                principal,
                null,
                authorities
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response); // continue chain
    }
}
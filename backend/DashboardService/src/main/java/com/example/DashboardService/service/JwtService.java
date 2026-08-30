package com.example.DashboardService.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSigningKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(secret);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    public Long extractUserId(String token) {

        return extractAllClaims(token)
                .get("userId", Long.class);
    }

    public Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims =
                extractAllClaims(token);

        return resolver.apply(claims);
    }

    private Claims extractAllClaims(
            String token) {

        return Jwts.parser()
                .verifyWith(
                        getSigningKey()
                )
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    public boolean isTokenExpired(
            String token) {

        return extractExpiration(token)
                .before(new Date());
    }


    public boolean validateToken(
            String token) {

        try {

            Claims claims =
                    extractAllClaims(token);

            return claims.getExpiration() == null
                    || claims.getExpiration()
                             .after(new Date());

        } catch (Exception e) {

            System.out.println(
                "JWT validation failed: "
                + e.getMessage()
            );

            return false;
        }
    }
}
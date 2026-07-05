package com.example.ProfileService.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.ProfileService.service.JwtService;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

   @Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
        throws ServletException, IOException {

    System.out.println("========== JWT FILTER ==========");
    System.out.println(request.getRequestURI());

    String authHeader = request.getHeader("Authorization");

    System.out.println("Authorization Header = " + authHeader);

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        System.out.println("No Bearer Token");
        filterChain.doFilter(request, response);
        return;
    }

    String token = authHeader.substring(7);

    try {

        System.out.println("Token = " + token);

        boolean valid = jwtService.validateToken(token);

        System.out.println("Token valid = " + valid);

        if(valid){

            Long userId = jwtService.extractUserId(token);

            System.out.println("UserId = " + userId);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userId,
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_USER"))
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("Authentication set");
        }

    } catch(Exception e){
        e.printStackTrace();
    }

    filterChain.doFilter(request,response);
}
}
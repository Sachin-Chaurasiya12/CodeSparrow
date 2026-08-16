package com.example.InventoryService.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtfilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws IOException{
        return http
            .cors(Customizer.withDefaults())
            .csrf(Customizer -> Customizer.disable())
            .authorizeHttpRequests( 
                request -> request
                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)   
            )
            .addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
    
}
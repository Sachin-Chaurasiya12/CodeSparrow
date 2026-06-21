package com.example.DashboardService.Security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.DashboardService.Exception.CustomAccessDeniedHandler;
import com.example.DashboardService.Exception.CustomAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // enables @PreAuthorize on controllers
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authEntryPoint;

    public SecurityConfig(JwtFilter jwtFilter,
                          CustomAccessDeniedHandler accessDeniedHandler,
                          CustomAuthenticationEntryPoint authEntryPoint) {
        this.jwtFilter = jwtFilter;
        this.accessDeniedHandler = accessDeniedHandler;
        this.authEntryPoint = authEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // ── No CSRF needed — stateless JWT, no session cookies
            .csrf(csrf -> csrf.disable())

            // ── No session — dashboard is fully stateless
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ── No form login / no HTTP Basic — auth service handles all of that
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // ── Route protection
            .authorizeHttpRequests(auth -> auth

                // Health check — allow without token (for load balancers, k8s probes)
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/internal/**").permitAll()

                // Admin-only routes
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // All dashboard and API routes require a valid JWT
                .requestMatchers(
                    "/dashboard/**",
                    "/api/**"
                ).authenticated()

                // Lock down everything else by default
                .anyRequest().authenticated()
            )

            // ── Error handling
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(authEntryPoint) // 401 - no/invalid token
                .accessDeniedHandler(accessDeniedHandler) // 403 - wrong role
            )

            // ── Plug in JWT filter BEFORE Spring's auth filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

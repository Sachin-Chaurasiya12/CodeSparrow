package com.example.DashboardService.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.DashboardService.model.DTO.ValidationRequest;
import com.example.DashboardService.model.DTO.ValidationResponse;

@Service
public class AuthServiceClient {

    private final RestTemplate restTemplate;

    public AuthServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ValidationResponse validate(
            String userId,
            String refreshToken) {

        ValidationRequest request =
                new ValidationRequest(userId, refreshToken);

        return restTemplate.postForObject(
                "http://auth-service/auth/validate",
                request,
                ValidationResponse.class
        );
    }
}

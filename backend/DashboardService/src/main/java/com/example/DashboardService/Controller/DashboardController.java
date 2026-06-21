package com.example.DashboardService.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DashboardService.model.DTO.ValidationRequest;
import com.example.DashboardService.model.DTO.ValidationResponse;
import com.example.DashboardService.service.AuthServiceClient;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private AuthServiceClient authClient;

    @PostMapping("/profile")
    public ResponseEntity<?> createProfile(@RequestBody ValidationRequest request) {

        ValidationResponse response =
                authClient.validate(
                        request.getUserId(),
                        request.getRefreshToken()
                );

        if (!response.isUserExists() || !response.isValid()) {
            return ResponseEntity.status(401)
                    .body("Unauthorized - redirect to login");
        }

        return ResponseEntity.ok("Profile created successfully");
    }
}

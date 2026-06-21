package com.CodeSparrow.AuthService.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CodeSparrow.AuthService.model.Users;
import com.CodeSparrow.AuthService.model.DTO.RegisterDTO;
import com.CodeSparrow.AuthService.model.DTO.RequestDTO;
import com.CodeSparrow.AuthService.model.DTO.ResponseDTO;
import com.CodeSparrow.AuthService.repository.UserRepository;
import com.CodeSparrow.AuthService.service.JwtService;
import com.CodeSparrow.AuthService.service.interfaces.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUserService service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository repo;
    public AuthController(IUserService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestDTO req){
        return ResponseEntity.ok(service.login(req));
    }
    @PostMapping("/register")
    public ResponseDTO register(@RequestBody RegisterDTO dto){
        return service.Register(dto);
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> body) {
    
    String refreshToken = body.get("refreshToken");

    if (refreshToken == null || refreshToken.isBlank()) {
        return ResponseEntity.status(403)
                .body("Refresh token missing");
    }

    try {

        // Extract email from JWT
        String email = jwtService.extractUsername(refreshToken);

        // Check if user exists
        Optional<Users> optionalUser = repo.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(403)
                    .body("User not found");
        }

        Users user = optionalUser.get();

        // Check token stored in DB
        if (user.getRefreshToken() == null ||
                !refreshToken.equals(user.getRefreshToken())) {

            return ResponseEntity.status(403)
                    .body("Invalid refresh token");
        }

        // Check expiration
        if (jwtService.isTokenExpired(refreshToken)) {
            return ResponseEntity.status(403)
                    .body("Refresh token expired");
        }

        // Generate new access token
        String newAccessToken =
                jwtService.generateToken(email, user);

        return ResponseEntity.ok(
                Map.of(
                        "accessToken", newAccessToken,
                        "refreshToken", refreshToken
                )
        );

    } catch (Exception e) {

        return ResponseEntity.status(403)
                .body("Invalid refresh token");
    }
}

}

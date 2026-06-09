package com.CodeSparrow.AuthService.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    String email = jwtService.extractUsername(refreshToken);

    Users user = repo.findByEmail(email).orElseThrow();

    // check DB stored token
    if (!refreshToken.equals(user.getRefreshToken())) {
        return ResponseEntity.status(403).body("Invalid refresh token");
    }

    if (jwtService.isTokenExpired(refreshToken)) {
        return ResponseEntity.status(403).body("Refresh token expired");
    }

    String newAccessToken = jwtService.generateToken(email,user.getRole().name(),user.getId(),user.getUsername());

    return ResponseEntity.ok(Map.of(
        "accessToken", newAccessToken,
        "refreshToken", refreshToken
    ));
}

}

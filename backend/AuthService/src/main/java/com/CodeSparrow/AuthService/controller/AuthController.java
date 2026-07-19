package com.CodeSparrow.AuthService.controller;

import org.springframework.http.HttpHeaders;
import java.util.Map;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
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

import jakarta.servlet.http.HttpServletResponse;

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
    public ResponseEntity<?> login(@RequestBody RequestDTO req,HttpServletResponse response){
        ResponseDTO dto = service.login(req);
        
        ResponseCookie cookie = ResponseCookie
                    .from("refreshToken", dto.getRefreshToken())
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Lax")
                    .path("/api/auth")
                    .maxAge(60 * 60 * 24 * 7)
                    .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(dto);
    }
    @PostMapping("/register")
    public ResponseDTO register(@RequestBody RegisterDTO dto){
        return service.Register(dto);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {

    ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(false) 
            .sameSite("Lax")
            .path("/api/auth")  
            .maxAge(0)          
            .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    return ResponseEntity.ok("Logged out successfully");
    }

@PostMapping("/refresh")
public ResponseEntity<?> refresh(HttpServletRequest request) {

    String refreshToken = null;

    if (request.getCookies() != null) {
        for (Cookie cookie : request.getCookies()) {
            if ("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
                break;
            }
        }
    }

    if (refreshToken == null) {
        return ResponseEntity.status(403)
                .body("Refresh token missing");
    }

    try {

        String email = jwtService.extractUsername(refreshToken);

        Optional<Users> optionalUser = repo.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(403)
                    .body("User not found");
        }

        Users user = optionalUser.get();

        if (user.getRefreshToken() == null ||
                !refreshToken.equals(user.getRefreshToken())) {

            return ResponseEntity.status(403)
                    .body("Invalid refresh token");
        }

        if (jwtService.isTokenExpired(refreshToken)) {

            return ResponseEntity.status(403)
                    .body("Refresh token expired");
        }

        String newAccessToken =
                jwtService.generateToken(email, user);

        return ResponseEntity.ok(
                Map.of(
                        "accessToken", newAccessToken
                )
        );

    } catch (Exception e) {

        return ResponseEntity.status(403)
                .body("Invalid refresh token");
    }
}

}

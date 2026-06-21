package com.CodeSparrow.AuthService.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CodeSparrow.AuthService.repository.UserRepository;

@RestController
@RequestMapping("/internal")
public class InternalAuthController {
    
    private final UserRepository repository;

    public InternalAuthController(UserRepository repository){
        this.repository = repository;
    }

    @GetMapping("/validate")
    public ResponseEntity<?> ValidateUser(
        @RequestParam String email
    ){
        boolean exist = repository.existsByEmail(email);

        return ResponseEntity.ok(Map.of("valid", exist));
    }
}

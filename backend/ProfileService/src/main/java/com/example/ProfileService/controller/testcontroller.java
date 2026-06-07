package com.example.ProfileService.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.ProfileService.model.DTO.ProfileResponseDTO;
import com.example.ProfileService.security.UserPrincipal;
import com.example.ProfileService.service.CloudinaryService;
import com.example.ProfileService.service.ProfileService;

@RestController
@RequestMapping("/profile")
public class testcontroller {

    @Autowired
    private ProfileService service;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("/hello")
    public String hello(Authentication authentication) {

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

        return "Hello user " + principal.userId();
    }

    @GetMapping
    public ProfileResponseDTO getProfile(Authentication authentication) {

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

        Long userId = principal.userId();

        return service.getProfilebyUserId(userId);
    }

    @PostMapping("/upload-avatar")
    public Map uploadAvatar(@RequestParam("file") MultipartFile file) {

        return cloudinaryService.uploadImage(file);
    }
}
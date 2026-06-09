package com.example.ProfileService.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.ProfileService.model.DTO.ProfileEntryDTO;
import com.example.ProfileService.model.DTO.ProfileEntryResponseDTO;
import com.example.ProfileService.model.DTO.ProfileResponseDTO;
import com.example.ProfileService.security.UserPrincipal;
import com.example.ProfileService.service.CloudinaryService;
import com.example.ProfileService.service.ProfileService;

@RestController
@RequestMapping("/profile")
public class Profilecontroller {

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

                System.out.println("USER ID = " + principal.userId());
    System.out.println("USERNAME = " + principal.username());
    System.out.println("EMAIL = " + principal.email());

        Long userId = principal.userId();
        String username = principal.username();

        return service.getProfilebyUserId(userId,username);
    }

    @PostMapping("/upload-avatar")
    public Map uploadAvatar(@RequestParam("file") MultipartFile file) {

        return cloudinaryService.uploadImage(file);
    }

    @PostMapping("/edit")
    public ProfileEntryResponseDTO setProfile(
        @RequestPart("data") ProfileEntryDTO entryDTO, 
        @RequestPart(value = "file", required = false) MultipartFile file
        ){
        return service.setProfilebyUserId(entryDTO,file);
    }
}
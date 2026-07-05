package com.example.ProfileService.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ProfileService.model.Dto.ProfileRequestdto;
import com.example.ProfileService.model.Dto.ProfileResponsedto;
import com.example.ProfileService.service.Interface.IProfileReadService;
import com.example.ProfileService.service.Interface.IProfileWriteService;


@RestController
@RequestMapping("/profile")
public class ProfileController {

    private IProfileWriteService service;
    private IProfileReadService readService;
    public ProfileController(IProfileWriteService service,IProfileReadService readService){
        this.service = service;
        this.readService = readService;
    }
    
    @PostMapping
    public ResponseEntity<String> createDefautProfile(@RequestBody ProfileRequestdto requestdto) {

        service.createDefaultProfile(requestdto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Success");
    }
    
    @GetMapping
    public ResponseEntity<ProfileResponsedto> getUserProfile(Authentication authentication){

        Long userId = (Long) authentication.getPrincipal();
        ProfileResponsedto response = readService.getProfile(userId);

        return ResponseEntity.ok(response);
    }
}

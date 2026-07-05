package com.example.ProfileService.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ProfileService.model.Dto.ProfileRequestdto;
import com.example.ProfileService.service.Interface.IProfileWriteService;


@RestController
@RequestMapping("/profile")
public class ProfileController {

    private IProfileWriteService service;
    public ProfileController(IProfileWriteService service){
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<String> createDefautProfile(@RequestBody ProfileRequestdto requestdto) {

        service.createDefaultProfile(requestdto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Success");
    }
}

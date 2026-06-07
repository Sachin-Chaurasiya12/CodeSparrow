package com.example.ProfileService.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ProfileService.security.UserPrincipal;

@RestController
public class testcontroller {

@GetMapping("/hello")
public String hello(Authentication authentication) {

    UserPrincipal principal =
            (UserPrincipal) authentication.getPrincipal();

    return "Hello user " + principal.userId();
}
}

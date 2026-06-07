package com.example.ProfileService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.ProfileService.Exception.UserNotFoundException;
import com.example.ProfileService.Repository.ProfileRepository;
import com.example.ProfileService.model.Profile;
import com.example.ProfileService.model.DTO.ProfileResponseDTO;
import com.example.ProfileService.security.UserPrincipal;

@Service
public class ProfileService {

    private ProfileRepository repository;

    public ProfileService(ProfileRepository repository){
        this.repository = repository;
    }

    public ProfileResponseDTO getProfilebyUserId(Long userId){

        Profile profile = repository.findByUserId(userId).orElseThrow(
            () -> new UserNotFoundException("User not found"));

        return new ProfileResponseDTO(
            profile.getAvatarUrl(),
            profile.getBio(),
            profile.getUsername(),
            profile.getCity(),
            profile.getCountry(),
            profile.getJoinedAt(),
            profile.getWebsite(),
            profile.getUserId(),
            profile.getCompany()
        );
    }
    
}

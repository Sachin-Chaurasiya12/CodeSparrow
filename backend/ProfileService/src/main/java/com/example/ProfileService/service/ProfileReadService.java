package com.example.ProfileService.service;

import org.springframework.stereotype.Service;

import com.example.ProfileService.Exception.ProfileNotFoundException;
import com.example.ProfileService.model.Profile;
import com.example.ProfileService.model.Dto.ProfileResponsedto;
import com.example.ProfileService.repository.ProfileRepository;
import com.example.ProfileService.service.Interface.IProfileReadService;

@Service
public class ProfileReadService implements IProfileReadService{

    private ProfileRepository repository;

    public ProfileReadService(ProfileRepository repository){
        this.repository = repository;
    }

    @Override
    public ProfileResponsedto getProfile(Long userId) {

        Profile profile = repository.findByUserId(userId)
                        .orElseThrow(() -> 
                        new  ProfileNotFoundException("Profile Not found"));

        return mapToResponse(profile);

    }

    private ProfileResponsedto mapToResponse(Profile profile) {

    ProfileResponsedto dto = new ProfileResponsedto();

    dto.setId(profile.getId());
    dto.setUserId(profile.getUserId());
    dto.setUsername(profile.getUsername());
    dto.setFullname(profile.getFullname());
    dto.setEmail(profile.getEmail());
    dto.setBio(profile.getBio());
    dto.setCity(profile.getCity());
    dto.setState(profile.getState());
    dto.setCountry(profile.getCountry());
    dto.setCompany(profile.getCompany());
    dto.setPhonenumber(profile.getPhonenumber());
    dto.setSolved(profile.getSolved());
    dto.setSnippets(profile.getSnippets());
    dto.setJoinedAt(profile.getJoined_at());
    dto.setAvatarPublicId(profile.getAvatarPublicId());
    dto.setAvatarSecureUrl(profile.getAvatarSecureUrl());
    dto.setBannerPublicId(profile.getBannerPublicId());
    dto.setBannerSecureUrl(profile.getBannerSecureUrl());

    return dto;
}
    
    
}

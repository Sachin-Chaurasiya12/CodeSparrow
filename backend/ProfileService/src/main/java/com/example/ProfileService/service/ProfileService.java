package com.example.ProfileService.service;

import java.util.Map;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.ProfileService.Exception.UserAlreadyExistException;
import com.example.ProfileService.Exception.UserNotFoundException;
import com.example.ProfileService.Repository.ProfileRepository;
import com.example.ProfileService.model.Profile;
import com.example.ProfileService.model.DTO.ProfileEntryDTO;
import com.example.ProfileService.model.DTO.ProfileEntryResponseDTO;
import com.example.ProfileService.model.DTO.ProfileResponseDTO;
import com.example.ProfileService.security.UserPrincipal;

@Service
public class ProfileService {

    private final ProfileRepository repository;
    private final CloudinaryService cloudinaryService;

    public ProfileService(ProfileRepository repository,
                          CloudinaryService cloudinaryService) {
        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
    }

    public ProfileResponseDTO getProfilebyUserId(Long userId,String username){

        Profile profile = repository.findByUserId(userId)
            .orElseGet(() -> {

                Profile newProfile = new Profile();

                newProfile.setUserId(userId);
                newProfile.setUsername(username);
                newProfile.setBio(" Hey! i am using Code Sparrow");
                newProfile.setCompany("");
                newProfile.setWebsite("");
                newProfile.setPhone("");
                newProfile.setCity("");
                newProfile.setState("");
                newProfile.setCountry("");
                newProfile.setAvatarUrl(
                    "https://ui-avatars.com/api/?name=User"
                );

                return repository.save(newProfile);

                
            });
            System.out.println("PROFILE USERNAME = " + profile.getUsername());

        return new ProfileResponseDTO(
            profile.getAvatarUrl(),
            profile.getBio(),
            profile.getUsername(),  
            profile.getCity(),
            profile.getCountry(),
            profile.getJoinedAt(),
            profile.getWebsite(),
            profile.getCompany(),  
            profile.getPhone(),     
            profile.getState(),     
            profile.getLocation()
        );
    }

public ProfileEntryResponseDTO setProfilebyUserId(ProfileEntryDTO entry, MultipartFile file) {

    Long userId = getCurrentUserId();

    // check if already exists
    Profile profile = repository.findByUserId(userId).orElse(new Profile());

        String secureUrl = null;
        String publicId = null;

        if (file != null && !file.isEmpty()) {
            Map result = cloudinaryService.uploadImage(file);
        
            secureUrl = (String) result.get("secure_url");
            publicId = (String) result.get("public_id");
        }

        profile.setUserId(userId);
        profile.setFirstName(entry.getFirstName());
        profile.setLastName(entry.getLastName());
        profile.setUsername(entry.getUsername());
        profile.setCompany(entry.getCompany());
        profile.setBio(entry.getBio());
        profile.setWebsite(entry.getWebsite());
        profile.setPhone(entry.getPhone());
        profile.setLocation(entry.getLocation());
        profile.setEmail(entry.getEmail());
        profile.setCity(entry.getCity());
        profile.setState(entry.getState());
        profile.setCountry(entry.getCountry());

        profile.setAvatarUrl(secureUrl);
        profile.setPublicid(publicId);

        Profile saved = repository.save(profile);

    return new ProfileEntryResponseDTO(
                saved.getUserId(),
                saved.getFirstName(),
                saved.getLastName(),
                saved.getUsername(),
                saved.getCompany(),
                saved.getBio(),
                saved.getWebsite(),
                saved.getPhone(),
                saved.getLocation(),
                saved.getAvatarUrl(),
                saved.getPublicid(),
                saved.getEmail(),
                saved.getCity(),
                saved.getState(),
                saved.getCountry(),
                "Profile created successfully"
        );
}

private Long getCurrentUserId() {
    UserPrincipal principal =
            (UserPrincipal) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

    return principal.userId();
}

}

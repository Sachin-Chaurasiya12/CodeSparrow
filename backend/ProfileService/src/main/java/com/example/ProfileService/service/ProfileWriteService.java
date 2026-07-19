package com.example.ProfileService.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.ProfileService.Exception.ProfileNotFoundException;
import com.example.ProfileService.model.Profile;
import com.example.ProfileService.model.Dto.Image;
import com.example.ProfileService.model.Dto.ProfileRequestdto;
import com.example.ProfileService.repository.ProfileRepository;
import com.example.ProfileService.service.Interface.IProfileWriteService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProfileWriteService implements IProfileWriteService{

    @Autowired
    public ProfileRepository repository;

    @Autowired
    public CloudinaryService service;

    @Override
    public void createDefaultProfile(ProfileRequestdto request) {

        Boolean userid = repository.existsByUserId(request.getUserId());

        if(userid){
            return;
        }

        MaptoRequest(request);
    }

    @Override
    public void updateProfile(ProfileRequestdto newreq, Long userId) {
        Profile profile = repository.findByUserId(userId).orElseThrow(
            () -> new UsernameNotFoundException("User Not found")
        );
        MapFields(newreq,profile);
    }

    @Override
    public ResponseEntity<Map> uploadFile(Image image, Long id) {
    try{

        if(image.getName().isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        if(image.getFile().isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        Profile profile = repository.findByUserId(id).orElseThrow(
            () -> new ProfileNotFoundException("profile not found")
        );

        Map<?,?> uploadresult = service.UploadFile(image.getFile(), "avatar");

        String publicId = (String)uploadresult.get("public_id");
        String secureUrl = (String)uploadresult.get("secure_url");

        profile.setAvatarPublicId(publicId);
        profile.setAvatarSecureUrl(secureUrl);
        
        if(profile.getAvatarSecureUrl() == null){
            return ResponseEntity.badRequest().build();
        }
        repository.save(profile);

        return ResponseEntity.ok().body(Map.of("secure_url", secureUrl,"public_id",publicId));
    }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error", e.getMessage()));
        }
    }
    @Override
    public ResponseEntity<Map> uploadBanner(Image image, Long id) {
        try{
        if(image.getName().isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        if(image.getFile().isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        Profile profile = repository.findByUserId(id).orElseThrow(
            () -> new ProfileNotFoundException("profile not found")
        );

        Map<?,?> uploadresult = service.UploadFile(image.getFile(), "banner");

        String publicId = (String)uploadresult.get("public_id");
        String secureUrl = (String)uploadresult.get("secure_url");

        profile.setBannerPublicId(publicId);
        profile.setBannerSecureUrl(secureUrl);
        
        if(profile.getBannerSecureUrl() == null){
            return ResponseEntity.badRequest().build();
        }
        repository.save(profile);

        return ResponseEntity.ok().body(Map.of("secure_url", secureUrl,"public_id",publicId));
    }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error", e.getMessage()));
        }
    }
    
    private void MapFields(ProfileRequestdto request, Profile file){

        file.setFullname(request.getUsername());
        file.setBio(request.getBio());
        file.setCity(request.getCity());
        file.setCompany(request.getCompany());
        file.setCountry(request.getCountry());
        file.setFullname(request.getFullname());
        file.setPhonenumber(request.getPhonenumber());
        file.setUsername(request.getUsername());
        file.setState(request.getState());
        file.setEmail(request.getEmail());
        repository.save(file);
    }

    private void MaptoRequest(ProfileRequestdto request){

        Profile file = new Profile();
        file.setUserId(request.getUserId());
        file.setFullname(request.getUsername());
        file.setBio(request.getBio());
        file.setCity(request.getCity());
        file.setCompany(request.getCompany());
        file.setCountry(request.getCountry());
        file.setFullname(request.getFullname());
        file.setJoined_at(LocalDateTime.now());
        file.setPhonenumber(request.getPhonenumber());
        file.setSolved(request.getSolved());
        file.setSnippets(request.getSnippets());
        file.setUsername(request.getUsername());
        file.setState(request.getState());

        repository.save(file);
    }
}

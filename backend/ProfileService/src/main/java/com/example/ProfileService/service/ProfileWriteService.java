package com.example.ProfileService.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ProfileService.model.Profile;
import com.example.ProfileService.model.Dto.ProfileRequestdto;
import com.example.ProfileService.repository.ProfileRepository;
import com.example.ProfileService.service.Interface.IProfileWriteService;

@Service
public class ProfileWriteService implements IProfileWriteService{

    @Autowired
    public ProfileRepository repository;

    @Override
    public void createDefaultProfile(ProfileRequestdto request) {

        Boolean userid = repository.existsByUserId(request.getUserId());

        if(userid){
            return;
        }

        MaptoRequest(request);
    }

    public void MaptoRequest(ProfileRequestdto request){

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

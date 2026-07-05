package com.example.ProfileService.service.Interface;

import org.springframework.stereotype.Service;

import com.example.ProfileService.model.Dto.ProfileRequestdto;

@Service
public interface IProfileWriteService{
    void createDefaultProfile(ProfileRequestdto request);
}

package com.example.ProfileService.service.Interface;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ProfileService.model.Dto.Image;
import com.example.ProfileService.model.Dto.ProfileRequestdto;

@Service
public interface IProfileWriteService{
    void createDefaultProfile(ProfileRequestdto request);
    void updateProfile(ProfileRequestdto newreq, Long userId);
    ResponseEntity<Map> uploadFile(Image image, Long id);
    ResponseEntity<Map> uploadBanner(Image image, Long id);

}

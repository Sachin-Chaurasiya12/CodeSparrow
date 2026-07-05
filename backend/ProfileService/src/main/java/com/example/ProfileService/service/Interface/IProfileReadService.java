package com.example.ProfileService.service.Interface;

import com.example.ProfileService.model.Dto.ProfileResponsedto;

public interface IProfileReadService {

    ProfileResponsedto getProfile(Long userId);
    
}
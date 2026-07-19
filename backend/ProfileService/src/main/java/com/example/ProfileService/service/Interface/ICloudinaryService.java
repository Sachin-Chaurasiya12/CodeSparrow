package com.example.ProfileService.service.Interface;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryService {
    Map<?,?> UploadFile(MultipartFile file, String foldername);
}

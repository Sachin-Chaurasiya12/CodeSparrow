package com.example.InventoryService.service.Interface;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ICloudinaryService {
    Map<?,?> UploadFile(MultipartFile file, String foldername);
}

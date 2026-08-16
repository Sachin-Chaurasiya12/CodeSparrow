package com.example.InventoryService.service;
import com.cloudinary.Cloudinary;
import com.example.InventoryService.service.Interface.ICloudinaryService;

import jakarta.annotation.Resource;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public class CloudinaryService implements ICloudinaryService{

    @Resource
    private Cloudinary cloudinary;

    @Override
    public Map<?, ?> UploadFile(MultipartFile file, String foldername) {
        try{
        Map<Object,Object> map = new HashMap<>();
        map.put("folder", foldername);
        Map<?,?> uploadedfile = cloudinary.uploader().upload(file.getBytes(), map);
        return uploadedfile;
        }catch(IOException e){
            throw new RuntimeException("Failed to upload image to cloudinary", e);
        }
    }
    
}

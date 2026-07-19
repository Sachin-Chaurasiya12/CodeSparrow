package com.example.ProfileService.model.Dto;

import org.springframework.web.multipart.MultipartFile;

public class Image {
    private String name;
    private MultipartFile file;

    public Image(){}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public MultipartFile getFile() {
        return file;
    }
    public void setFile(MultipartFile file) {
        this.file = file;
    }
}

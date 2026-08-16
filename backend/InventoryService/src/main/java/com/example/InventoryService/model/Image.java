package com.example.InventoryService.model;

import org.springframework.web.multipart.MultipartFile;

public class Image {
    private String name;
    private MultipartFile file;
    private int titleid;

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
    public int getTitleid() {
        return titleid;
    }
    public void setTitleid(int titleid) {
        this.titleid = titleid;
    }
}

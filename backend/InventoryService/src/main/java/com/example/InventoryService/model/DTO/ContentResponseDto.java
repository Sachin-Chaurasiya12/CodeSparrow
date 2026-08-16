package com.example.InventoryService.model.DTO;

public class ContentResponseDto {

    private String title;
    private int title_id;

    public ContentResponseDto(){}

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public int getTitle_id() {
        return title_id;
    }
    public void setTitle_id(int title_id) {
        this.title_id = title_id;
    }
}

package com.example.InventoryService.model.DTO;

public class ResponseDTO {
    
    private int id;
    private String title;
    private String content;

    public ResponseDTO(int id, String title,String content){
        this.content = content;
        this.title = title;
        this.id = id;
    }

    public ResponseDTO(){}
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
}

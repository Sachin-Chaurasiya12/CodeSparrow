package com.example.InventoryService.model.DTO;

public class SnippetResponse {
    private int id;
    private String title;

    public SnippetResponse(int id, String title){
        this.id = id;
        this.title = title;
    }

    public SnippetResponse(){}
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
}

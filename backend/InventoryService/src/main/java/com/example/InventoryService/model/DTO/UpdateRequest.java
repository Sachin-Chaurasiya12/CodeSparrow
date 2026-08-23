package com.example.InventoryService.model.DTO;

public class UpdateRequest {
    
    private int title_id;
    private String content;
    private String publicid;
    private String secureurl;
    private String publicid1;
    private String secureurl1;

    public UpdateRequest(){}
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getPublicid() {
        return publicid;
    }
    public void setPublicid(String publicid) {
        this.publicid = publicid;
    }
    public String getPublicid1() {
        return publicid1;
    }
    public void setPublicid1(String publicid1) {
        this.publicid1 = publicid1;
    }
    public String getSecureurl() {
        return secureurl;
    }
    public void setSecureurl(String secureurl) {
        this.secureurl = secureurl;
    }
    public String getSecureurl1() {
        return secureurl1;
    }
    public void setSecureurl1(String secureurl1) {
        this.secureurl1 = secureurl1;
    }
    public int getTitle_id() {
        return title_id;
    }
    public void setTitle_id(int title_id) {
        this.title_id = title_id;
    }

}

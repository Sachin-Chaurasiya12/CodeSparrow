package com.example.InventoryService.model.DTO;


public class ContentRequestDto {
    
    private String title;
    private String content;
    private String secureurl;
    private String publicid;
    private String secureurl2;
    private String publicid2;

    public ContentRequestDto(){}

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getPublicid() {
        return publicid;
    }
    public String getPublicid2() {
        return publicid2;
    }public void setPublicid(String publicid) {
        this.publicid = publicid;
    }
    public String getSecureurl() {
        return secureurl;
    }
    public void setPublicid2(String publicid2) {
        this.publicid2 = publicid2;
    }
    public String getSecureurl2() {
        return secureurl2;
    }
    public void setSecureurl(String secureurl) {
        this.secureurl = secureurl;
    }
    public void setSecureurl2(String secureurl2) {
        this.secureurl2 = secureurl2;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
}

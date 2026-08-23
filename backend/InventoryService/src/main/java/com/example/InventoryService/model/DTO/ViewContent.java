package com.example.InventoryService.model.DTO;

import org.bouncycastle.jcajce.provider.asymmetric.dsa.DSASigner.stdDSA;

import jakarta.persistence.Column;

public class ViewContent {
    
    private int title_id;
    private String title;
    private String content;
    private String secureurl;
    private String publicid;
    private String secureurl2;
    private String publicid2;

    public ViewContent(){}

    public String getContent() {
        return content;
    }public void setContent(String content) {
        this.content = content;
    }public int getTitle_id() {
        return title_id;
    }
    public void setTitle_id(int title_id) {
        this.title_id = title_id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getPublicid() {
        return publicid;
    }
    public void setPublicid(String publicid) {
        this.publicid = publicid;
    }
    public String getPublicid2() {
        return publicid2;
    }
    public void setPublicid2(String publicid2) {
        this.publicid2 = publicid2;
    }
    public String getSecureurl() {
        return secureurl;
    }
    public void setSecureurl(String secureurl) {
        this.secureurl = secureurl;
    }
    public String getSecureurl2() {
        return secureurl2;
    }
    public void setSecureurl2(String secureurl2) {
        this.secureurl2 = secureurl2;
    }
    
}

package com.example.InventoryService.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "title_id", nullable = false)
    private titles title;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "secureurl")
    private String secureurl;

    @Column(name = "publicid")
    private String publicid;
    
    @Column(name = "secureurl2")
    private String secureurl2;

    @Column(name = "publicid2")
    private String publicid2;
    
    public Inventory(int id,titles title,String content,String secureurl,
            String publicid,String secureurl2,String publicid2){

            this.id = id;
            this.content = content;
            this.title = title;
            this.publicid = publicid;
            this.secureurl = secureurl;
            this.publicid2 = publicid2;
            this.secureurl2 = secureurl2;

    }

    public Inventory() {}

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
    }public titles getTitle() {
        return title;
    }public void setTitle(titles title) {
        this.title = title;
    }
}

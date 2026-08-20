package com.example.InventoryService.model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "titles",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userid", "title"})
    },
    indexes = @Index(name = "idx_title_name", columnList = "title")
)
public class titles {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "userid")
    private Long userid;

    @Column(name = "addedon")
    private LocalDateTime addedon;

    @Column(name = "isactive")
    private boolean isActive = true;

    public titles(int id,String title,Long userid,LocalDateTime addedon,boolean isActive){
        this.id = id;
        this.title =title;
        this.addedon = addedon;
        this.userid = userid;
        this.isActive = isActive;
    }

    public titles(){}

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
    public LocalDateTime getAddedon() {
        return addedon;
    }
    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
    public Boolean getActive(){
        return isActive;
    }
    public Long getUserid() {
        return userid;
    }public void setAddedon(LocalDateTime addedon) {
        this.addedon = addedon;
    }
    public void setUserid(Long userid) {
        this.userid = userid;
    }
    
}

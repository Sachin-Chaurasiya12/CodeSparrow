package com.example.ProfileService.model.DTO;

import java.time.LocalDateTime;

public class ProfileResponseDTO {
    
    private Long userid;
    private String username;
    private String company;
    private String bio;
    private String website;
    private String phone;
    private String location;
    private String avatarUrl;
    private String city;
    private String state;
    private String country;
    private LocalDateTime joinedAt;

    public ProfileResponseDTO(){}
    public ProfileResponseDTO(String avatarUrl2, String bio2, String username2, String city2, String country2,
            LocalDateTime joinedAt2, String website2, Long userId2, String company2) {
        this.avatarUrl = avatarUrl2;
        this.bio = bio2;
        this.city = city2;
        this.company = company2;
        this.country = country2;
        this.userid = userId2;
        this.city = city2;
        this.website = website2; 
    }
    public String getAvatarUrl() {
        return avatarUrl;
    }
    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public String getBio() {
        return bio;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getCity() {
        return city;
    }public void setCompany(String company) {
        this.company = company;
    }
    public String getCompany() {
        return company;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public String getCountry() {
        return country;
    }
    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getLocation() {
        return location;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getPhone() {
        return phone;
    }
    public void setState(String state) {
        this.state = state;
    }public String getState() {
        return state;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getWebsite() {
        return website;
    }
    public void setWebsite(String website) {
        this.website = website;
    }
    public Long getUserid() {
        return userid;
    }
    public void setUserid(Long userid) {
        this.userid = userid;
    }
}

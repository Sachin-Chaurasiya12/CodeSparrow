package com.example.ProfileService.model.Dto;

public class ProfileRequestdto {

    private String username;
    private String fullname;
    private String bio;
    private Integer snippets;
    private Integer solved;
    private String phonenumber;
    private String city;
    private String state;
    private String country;
    private String company;
    private Long userId;
    private String email;

    public ProfileRequestdto() {
    }

    public ProfileRequestdto(String username, String fullname, String bio,
                          Integer snippets, Integer solved, String phonenumber,
                          String city, String state, String country,
                          String company, String avatarPublicId,
                          String avatarSecureUrl, String bannerPublicId,
                          String bannerSecureUrl, Long userId,
                          String email) {
        this.username = username;
        this.fullname = fullname;
        this.bio = bio;
        this.snippets = snippets;
        this.solved = solved;
        this.phonenumber = phonenumber;
        this.city = city;
        this.state = state;
        this.country = country;
        this.company = company;
        this.userId = userId;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

     public Integer getSnippets() {
        return snippets;
    }

    public void setSnippets(Integer snippets) {
        this.snippets = snippets;
    }

    public Integer getSolved() {
        return solved;
    }

    public void setSolved(Integer solved) {
        this.solved = solved;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
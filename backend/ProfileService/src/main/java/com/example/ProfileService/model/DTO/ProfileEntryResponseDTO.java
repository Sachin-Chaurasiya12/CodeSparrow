package com.example.ProfileService.model.DTO;

public class ProfileEntryResponseDTO {

    private Long userId;

    private String firstName;
    private String lastName;
    private String username;
    private String company;
    private String bio;
    private String website;
    private String phone;
    private String location;
    private String avatarUrl;
    private String publicid;
    private String email;
    private String city;
    private String state;
    private String country;

    private String message;

    public ProfileEntryResponseDTO() {
    }

    public ProfileEntryResponseDTO(Long userId, String firstName, String lastName,
                                   String username, String company, String bio,
                                   String website, String phone, String location,
                                   String avatarUrl, String publicid, String email,
                                   String city, String state, String country,
                                   String message) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.company = company;
        this.bio = bio;
        this.website = website;
        this.phone = phone;
        this.location = location;
        this.avatarUrl = avatarUrl;
        this.publicid = publicid;
        this.email = email;
        this.city = city;
        this.state = state;
        this.country = country;
        this.message = message;
    }

    // ===== Getters and Setters =====

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getPublicid() {
        return publicid;
    }

    public void setPublicid(String publicid) {
        this.publicid = publicid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
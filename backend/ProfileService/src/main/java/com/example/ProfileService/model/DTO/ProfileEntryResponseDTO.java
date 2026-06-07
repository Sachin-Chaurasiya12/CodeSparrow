package com.example.ProfileService.model.DTO;

public class ProfileEntryResponseDTO {

    private Long id;
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
    private String email;
    private String city;
    private String state;
    private String country;

    private String message; // optional success message

    // Default constructor
    public ProfileEntryResponseDTO() {
    }

    // All-args constructor
    public ProfileEntryResponseDTO(Long id, Long userId, String firstName, String lastName,
                               String username, String company, String bio,
                               String website, String phone, String location,
                               String avatarUrl, String email, String city,
                               String state, String country, String message) {
        this.id = id;
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
        this.email = email;
        this.city = city;
        this.state = state;
        this.country = country;
        this.message = message;
    }

    // Getters & Setters
    // (same as usual)
}
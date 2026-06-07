package com.example.ProfileService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    // Personal info
    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String username;

    private String company;

    @Column(length = 500)
    private String bio;

    private String website;

    // Contact
    private String phone;

    // Display
    private String location;
    private String avatarUrl;

    private String email;
    private String city;
    private String state;
    private String country;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column(updatable = false)
    private LocalDateTime updatedAt;

    @Column(updatable = false)
    private LocalDateTime joinedAt;

    @PrePersist
    protected void onCreate() {
        joinedAt = LocalDateTime.now();
    }
}
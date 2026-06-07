package com.example.ProfileService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(updatable = false)
    private LocalDateTime joinedAt;

    @PrePersist
    protected void onCreate() {
        joinedAt = LocalDateTime.now();
    }
}
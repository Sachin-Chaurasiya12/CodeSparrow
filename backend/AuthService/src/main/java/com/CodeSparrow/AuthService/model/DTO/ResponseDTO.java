package com.CodeSparrow.AuthService.model.DTO;

import com.CodeSparrow.AuthService.model.Role;

public class ResponseDTO {
    private Long id;
    private Role role;
    private String message;
    private String email;
    private String accessToken;
    private String refreshToken;

    public String getEmail() {
        return email;
    }public void setEmail(String email) {
        this.email = email;
    }
    public String getmessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    public String getAccessToken() {
        return accessToken;
    }
    public String getRefreshToken() {
        return refreshToken;
    }public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
}

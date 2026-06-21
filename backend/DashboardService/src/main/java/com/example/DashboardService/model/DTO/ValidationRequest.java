package com.example.DashboardService.model.DTO;

public class ValidationRequest {

    private String userId;
    private String refreshToken;

    public ValidationRequest() {
    }

    public ValidationRequest(String userId, String refreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}

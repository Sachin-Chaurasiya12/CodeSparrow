package com.example.ConnectService.model;

import java.time.LocalDateTime;

public class ErrorResponse {
    
    private int StatusCode;
    private String message;
    private LocalDateTime timestamp;

    public ErrorResponse(int statusCode, String message, LocalDateTime timestamp){
        this.StatusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public int getStatusCode() {
        return StatusCode;
    }
    public void setStatusCode(int statusCode) {
        StatusCode = statusCode;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

}

package com.example.DashboardService.model.DTO;

public class ValidationResponse {

    private boolean valid;
    private boolean userExists;

    public ValidationResponse() {
    }

    public ValidationResponse(boolean valid, boolean userExists) {
        this.valid = valid;
        this.userExists = userExists;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public boolean isUserExists() {
        return userExists;
    }

    public void setUserExists(boolean userExists) {
        this.userExists = userExists;
    }
}

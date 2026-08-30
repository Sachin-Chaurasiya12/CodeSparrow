package com.example.ConnectService.Exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super(message);
    }
}

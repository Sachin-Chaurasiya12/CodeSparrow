package com.example.ProfileService.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUsernotfound(UserNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<?> handleUserExist(UserAlreadyExistException ex){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}

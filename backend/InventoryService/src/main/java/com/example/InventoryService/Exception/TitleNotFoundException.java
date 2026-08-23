package com.example.InventoryService.Exception;

public class TitleNotFoundException extends RuntimeException{

    public TitleNotFoundException(String message){
        super(message);
    }
    
}

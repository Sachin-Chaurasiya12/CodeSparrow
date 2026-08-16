package com.example.InventoryService.Exception;

public class TitleAlreadyExistsException extends RuntimeException {

    public TitleAlreadyExistsException(String message) {
        super(message);
    }
}

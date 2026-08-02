package com.example.InventoryService.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    
    @PostMapping("/createnew")
    public String CreateNew(){
        return "new";
    }

    @PutMapping("/update/{id}")
    public String CreateNew(Long id){
        return "new";
    }

    @GetMapping()
    public void GetSnippet(){
        return;
    }
    
}

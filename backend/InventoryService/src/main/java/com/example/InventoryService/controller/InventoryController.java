package com.example.InventoryService.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.InventoryService.model.Image;
import com.example.InventoryService.model.DTO.ContentRequestDto;
import com.example.InventoryService.model.DTO.ContentResponseDto;
import com.example.InventoryService.service.Interface.ICreateInventoryService;


@RestController
@RequestMapping("/inventory")
public class InventoryController {

    
    @Autowired
    private ICreateInventoryService service;

    public InventoryController(ICreateInventoryService service){
        this.service = service;
    }
    
    @PostMapping("/createnew")
    public ResponseEntity<ContentResponseDto> CreateNew(Authentication authentication,
                 @RequestBody ContentRequestDto dto){

        Long userid = (Long) authentication.getPrincipal();
        ContentResponseDto responseDto = service.CreateNewContent(userid, dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);

    }

    @PostMapping(value = "/uploadImage1",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  ResponseEntity<Map> uploadImage1(Image image,Authentication authentication){
        try {
            Long userId = (Long)authentication.getPrincipal();
            return service.uploadFileOne(image, userId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error",e.getMessage()));
        }
    }
    
    @PostMapping(value = "/uploadImage2",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  ResponseEntity<Map> uploadImage2(Image image,Authentication authentication){
        try {
            Long userId = (Long)authentication.getPrincipal();
            return service.uploadFileTwo(image, userId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error",e.getMessage()));
        }
    }

    
    
}

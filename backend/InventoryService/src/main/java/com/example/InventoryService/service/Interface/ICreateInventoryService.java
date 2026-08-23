package com.example.InventoryService.service.Interface;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.InventoryService.model.Image;
import com.example.InventoryService.model.DTO.ContentRequestDto;
import com.example.InventoryService.model.DTO.ContentResponseDto;
import com.example.InventoryService.model.DTO.UpdateRequest;


@Service
public interface ICreateInventoryService {
    
    ContentResponseDto CreateNewContent(Long userid,ContentRequestDto request);
    ResponseEntity<Map> uploadFileOne(Image image, Long id);
    ResponseEntity<Map> uploadFileTwo(Image image, Long id);
    ResponseEntity<String> deleteSnippet(int id,Long userid);
    ResponseEntity<String> updateSnippet(UpdateRequest request, Long userid);
    ResponseEntity<String> deleteImage(int titleId, int slot, Long userId);
}

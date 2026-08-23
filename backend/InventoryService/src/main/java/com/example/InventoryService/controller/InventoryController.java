package com.example.InventoryService.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.InventoryService.model.ErrorResponse;
import com.example.InventoryService.model.Image;
import com.example.InventoryService.model.titles;
import com.example.InventoryService.model.DTO.ContentRequestDto;
import com.example.InventoryService.model.DTO.ContentResponseDto;
import com.example.InventoryService.model.DTO.SnippetResponse;
import com.example.InventoryService.model.DTO.UpdateRequest;
import com.example.InventoryService.model.DTO.ViewContent;
import com.example.InventoryService.service.Interface.ICreateInventoryService;
import com.example.InventoryService.service.Interface.IReadInventoryService;


@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private ICreateInventoryService service;
    private IReadInventoryService readservice;

    public InventoryController(ICreateInventoryService service, IReadInventoryService readservice){
        this.service = service;
        this.readservice = readservice;
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

    @GetMapping("/snippets")
    public Page<SnippetResponse> getFilteredSnippets(
        @RequestParam(required = false) String searchTerm,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "15") int size,
        @RequestParam(defaultValue = "title") String sortBy
    ){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        return readservice.getFilteredSnippets(searchTerm, pageable);
    }

    @GetMapping("/vaultcount")
    public long getCount(){
        return readservice.getSnippetsCount();
    }

    @DeleteMapping("/deletesnippet")
    public ResponseEntity<String> deleteSnippet(
            @RequestParam int id,
            Authentication authentication) {
            
        Long userId = (Long) authentication.getPrincipal();
            
        return service.deleteSnippet(id, userId);
    }

    @GetMapping("/View")
    public ResponseEntity<ViewContent> viewContent(
        @RequestParam int title_id,
        Authentication authentication
    ){
        Long userid =  (Long) authentication.getPrincipal();

        return readservice.ViewSnippet(title_id, userid);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateContent(
        @RequestBody UpdateRequest request,
        Authentication authentication
    ){
        Long userid = (Long) authentication.getPrincipal();

        return service.updateSnippet(request, userid);
    }

    @DeleteMapping("/deleteImage")
    public ResponseEntity<String> deleteImage(
        @RequestParam int title_id,
        @RequestParam int slot,
        Authentication authentication
    ){
        Long userid = (Long) authentication.getPrincipal();
        return service.deleteImage(title_id, slot, userid);
    }
}

package com.example.ConnectService.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ConnectService.model.Community;
import com.example.ConnectService.model.DTO.CommunityMessageResponse;
import com.example.ConnectService.model.DTO.SendMessageRequest;
import com.example.ConnectService.repository.CommunityRepository;
import com.example.ConnectService.service.Interface.IMessageService;

@RestController
@RequestMapping("/Community/messages")
public class CommunityMessageController {
    
    private final CommunityRepository repository;
    public CommunityMessageController(CommunityRepository repository, IMessageService service){
        this.repository = repository;
    }

    @GetMapping
    public List<Community> getMessages(){
        return repository.findAll();
    }

}

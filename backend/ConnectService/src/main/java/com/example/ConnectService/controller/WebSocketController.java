package com.example.ConnectService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import com.example.ConnectService.model.DTO.CommunityMessageResponse;
import com.example.ConnectService.model.DTO.SendMessageRequest;
import com.example.ConnectService.repository.CommunityRepository;
import com.example.ConnectService.service.Interface.IMessageService;

@Controller
public class WebSocketController {
    private final CommunityRepository repository;
    private final IMessageService service;
    public WebSocketController(CommunityRepository repository, IMessageService service){
        this.repository = repository;
        this.service = service;
    }

    @MessageMapping("/community.send")
    @SendTo("/topic/community")
    public ResponseEntity<CommunityMessageResponse> sendMessage(
        Authentication authentication,
        SendMessageRequest request
    ){
        Long userId = (Long)authentication.getPrincipal();

        ResponseEntity<CommunityMessageResponse> response = 
            service.sendMessage(userId, request);

        return response;
    }
}

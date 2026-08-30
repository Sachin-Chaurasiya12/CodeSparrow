package com.example.ConnectService.service.Interface;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ConnectService.model.DTO.CommunityMessageResponse;
import com.example.ConnectService.model.DTO.SendMessageRequest;

@Service
public interface IMessageService {
    public ResponseEntity<CommunityMessageResponse> sendMessage(
        Long userId,
        SendMessageRequest request
    );
}

package com.example.ConnectService.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ConnectService.Exception.UserNotFoundException;
import com.example.ConnectService.model.Community;
import com.example.ConnectService.model.DTO.CommunityMessageResponse;
import com.example.ConnectService.model.DTO.SendMessageRequest;
import com.example.ConnectService.repository.CommunityRepository;
import com.example.ConnectService.service.Interface.IMessageService;

@Service
public class MessageService implements IMessageService {
    
    private final CommunityRepository repository;

    public MessageService(CommunityRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseEntity<CommunityMessageResponse> sendMessage(
        Long userId,
        SendMessageRequest request
    ) {

        if (request.getContent() == null ||
            request.getContent().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Message cannot be empty"
            );
        }

        if (request.getContent().length() > 2000) {

            throw new IllegalArgumentException(
                    "Message length cannot be more than 2000 characters"
            );
        }

        Community community = new Community();

        community.setSenderUserId(userId);
        community.setContent(request.getContent().trim());
        community.setReplyToMessageId(request.getReplyToMessageId());

        Community saved = repository.save(community);

        CommunityMessageResponse response =
                new CommunityMessageResponse(
                        saved.getSenderUserId(),
                        saved.getContent(),
                        saved.getReplyToMessageId(),
                        saved.getCreatedAt()
                );

        return ResponseEntity.ok(response);
    }
}   

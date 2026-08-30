package com.example.ConnectService.model.DTO;

import java.time.LocalDateTime;

public class CommunityMessageResponse {
    private Long senderUserId;

    private String content;

    private Long replyToMessageId;

    private LocalDateTime createdAt;

    public CommunityMessageResponse(
            Long senderUserId,
            String content,
            Long replyToMessageId,
            LocalDateTime createdAt) {

        this.senderUserId = senderUserId;
        this.content = content;
        this.replyToMessageId = replyToMessageId;
        this.createdAt = createdAt;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Long getReplyToMessageId() {
        return replyToMessageId;
    }
    public void setReplyToMessageId(Long replyToMessageId) {
        this.replyToMessageId = replyToMessageId;
    }
    public Long getSenderUserId() {
        return senderUserId;
    }
    public void setSenderUserId(Long senderUserId) {
        this.senderUserId = senderUserId;
    }

}

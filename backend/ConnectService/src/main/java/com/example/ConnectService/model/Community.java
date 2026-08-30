package com.example.ConnectService.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "community_message")
public class Community {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_user_id", nullable = false)
    private Long senderUserId;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(name = "reply_to_message_id")
    private Long replyToMessageId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public Community(){}

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
    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
    public Long getId() {
        return id;
    }
    public Long getReplyToMessageId() {
        return replyToMessageId;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setReplyToMessageId(Long replyToMessageId) {
        this.replyToMessageId = replyToMessageId;
    }
    public Long getSenderUserId() {
        return senderUserId;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setSenderUserId(Long senderUserId) {
        this.senderUserId = senderUserId;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

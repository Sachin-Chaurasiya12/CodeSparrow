package com.example.InventoryService.service.Interface;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.InventoryService.model.DTO.SnippetResponse;

@Service
public interface IReadInventoryService {
    Page<SnippetResponse> getFilteredSnippets(String searchTerm, Pageable pageable);
    long getSnippetsCount();
}

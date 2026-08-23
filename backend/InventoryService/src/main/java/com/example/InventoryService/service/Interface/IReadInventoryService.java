package com.example.InventoryService.service.Interface;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.InventoryService.model.DTO.SnippetResponse;
import com.example.InventoryService.model.DTO.ViewContent;

@Service
public interface IReadInventoryService {
    Page<SnippetResponse> getFilteredSnippets(String searchTerm, Pageable pageable);
    long getSnippetsCount();
    ResponseEntity<ViewContent> ViewSnippet(int title_id, Long userid);

}

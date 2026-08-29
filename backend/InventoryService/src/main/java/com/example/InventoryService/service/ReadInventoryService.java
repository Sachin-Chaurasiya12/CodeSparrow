package com.example.InventoryService.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.InventoryService.Exception.TitleNotFoundException;
import com.example.InventoryService.Exception.UserNotFoundException;
import com.example.InventoryService.common.TitleSpecification;
import com.example.InventoryService.model.Inventory;
import com.example.InventoryService.model.titles;
import com.example.InventoryService.model.DTO.SnippetResponse;
import com.example.InventoryService.model.DTO.ViewContent;
import com.example.InventoryService.repository.InventoryRepository;
import com.example.InventoryService.repository.TitleRepository;
import com.example.InventoryService.service.Interface.IReadInventoryService;

@Service
public class ReadInventoryService implements IReadInventoryService{
    
    private final TitleRepository repo;
    private final InventoryRepository irepo;

    public ReadInventoryService(TitleRepository repo, InventoryRepository irepo){
        this.repo = repo;
        this.irepo = irepo;
    }
    @Override
    public Page<SnippetResponse> getFilteredSnippets(String searchTerm, Long userid,Pageable pageable) {
        TitleSpecification spec = new TitleSpecification(searchTerm, userid);
        return repo.findAll(spec, pageable)
                .map(title -> new SnippetResponse(
                    title.getId(),
                    title.getTitle()
                ));
    }
    @Override
    public long getSnippetsCountByUserid(Long userid) {
        long count = repo.countByIsActiveTrueAndUserid(userid);
        return count;
    }
    @Override
    public ResponseEntity<ViewContent> ViewSnippet(int title_id, Long userid) {
        
        titles t = repo.findByIdAndUserid(title_id, userid).orElseThrow(
            () -> new UserNotFoundException("User not found")
        );

        Inventory i = irepo.findByTitle_Id(t.getId()).orElseThrow(
            () -> new TitleNotFoundException("title not found")
        );

        ViewContent content = new ViewContent();
        content.setTitle(t.getTitle());
        content.setTitle_id(title_id);
        content.setContent(i.getContent());
        content.setSecureurl(i.getSecureurl());
        content.setSecureurl2(i.getSecureurl2());

        return ResponseEntity.ok(content);
    }
    
}

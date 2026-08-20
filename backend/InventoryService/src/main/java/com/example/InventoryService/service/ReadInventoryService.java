package com.example.InventoryService.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.InventoryService.common.TitleSpecification;
import com.example.InventoryService.model.titles;
import com.example.InventoryService.model.DTO.SnippetResponse;
import com.example.InventoryService.repository.TitleRepository;
import com.example.InventoryService.service.Interface.IReadInventoryService;

@Service
public class ReadInventoryService implements IReadInventoryService{
    
    private final TitleRepository repo;

    public ReadInventoryService(TitleRepository repo){
        this.repo = repo;
    }
    @Override
    public Page<SnippetResponse> getFilteredSnippets(String searchTerm, Pageable pageable) {
        TitleSpecification spec = new TitleSpecification(searchTerm);
        return repo.findAll(spec, pageable)
                .map(title -> new SnippetResponse(
                    title.getId(),
                    title.getTitle()
                ));
    }
    @Override
    public long getSnippetsCount() {
        long count = repo.count();
        return count;
    }
    
}

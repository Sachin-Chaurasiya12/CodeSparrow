package com.example.InventoryService.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryService.model.titles;

public interface TitleRepository extends JpaRepository<titles, Integer>{
    
    Optional<titles> findByUserid(Long userid);
    Optional<titles> findByTitle(String title);

    Boolean existsByUserid(Long userid);
    boolean existsByUseridAndTitle(Long userid, String title);
}

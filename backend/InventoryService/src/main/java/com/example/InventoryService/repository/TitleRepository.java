package com.example.InventoryService.repository;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.QueryHints;

import com.example.InventoryService.model.titles;

import jakarta.persistence.QueryHint;

public interface TitleRepository extends JpaRepository<titles, Integer>, JpaSpecificationExecutor<titles>{
    
    Optional<titles> findByUserid(Long userid);
    Optional<titles> findByTitle(String title);
    Optional<titles> findByIdAndUserid(int id,Long userid);
    Boolean existsByUserid(Long userid);
    boolean existsByUseridAndTitle(Long userid, String title);
    @Override
    @QueryHints(@QueryHint(name = "org.hibernate.fetchSize", value = "15"))
    Page<titles> findAll(Specification<titles> spec, Pageable pageable);
}

package com.example.InventoryService.common;

import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

import com.example.InventoryService.model.titles;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class TitleSpecification implements Specification<titles>{

    private final String searchTerm;

    public TitleSpecification(String searchTerm){
        this.searchTerm = searchTerm;
    }

    @Override
    public @Nullable Predicate toPredicate(Root<titles> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        Predicate activePredicte = cb.equal(root.get("isActive"), true);
        if(searchTerm == null || searchTerm.isEmpty()){
            return activePredicte;
        }

        String pattern = "%" + searchTerm.toLowerCase() + "%";
        return cb.and(cb.like(cb.lower(root.get("title")), pattern),
            activePredicte
        );
    }
    
}

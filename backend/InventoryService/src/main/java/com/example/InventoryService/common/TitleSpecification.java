package com.example.InventoryService.common;

import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

import com.example.InventoryService.model.titles;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class TitleSpecification implements Specification<titles> {

    private final String searchTerm;
    private final Long userid;

    public TitleSpecification(String searchTerm, Long userid) {
        this.searchTerm = searchTerm;
        this.userid = userid;
    }

    @Override
    public @Nullable Predicate toPredicate(
            Root<titles> root,
            CriteriaQuery<?> query,
            CriteriaBuilder cb) {

        Predicate activePredicate =
                cb.equal(root.get("isActive"), true);

        Predicate userPredicate =
                cb.equal(root.get("userid"), userid);

        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return cb.and(
                    activePredicate,
                    userPredicate
            );
        }
        String pattern = "%" + searchTerm.trim().toLowerCase() + "%";

        Predicate searchPredicate =
                cb.like(
                    cb.lower(root.get("title")),
                    pattern
                );

        return cb.and(
                activePredicate,
                userPredicate,
                searchPredicate
        );
    }
}
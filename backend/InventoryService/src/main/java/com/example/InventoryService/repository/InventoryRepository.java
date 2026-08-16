package com.example.InventoryService.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryService.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    Optional<Inventory> findByTitle_Id(int titleId);

}
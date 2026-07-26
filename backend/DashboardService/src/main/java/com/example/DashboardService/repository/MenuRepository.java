package com.example.DashboardService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.DashboardService.model.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu,Integer> {
     List<Menu> findByParentIdIsNullAndIsActiveTrueOrderByDisplayOrderAsc();

    List<Menu> findByParentIdAndIsActiveTrueOrderByDisplayOrderAsc(Integer parentId);
}

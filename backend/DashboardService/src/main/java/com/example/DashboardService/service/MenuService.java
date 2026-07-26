package com.example.DashboardService.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.DashboardService.model.Menu;
import com.example.DashboardService.repository.MenuRepository;

@Service
public class MenuService {
    
    private final MenuRepository repository;

    public MenuService(MenuRepository repository){
        this.repository = repository;
    }

     public List<Menu> getMenus() {

        List<Menu> menus =
                repository.findByParentIdIsNullAndIsActiveTrueOrderByDisplayOrderAsc();

        for (Menu menu : menus) {
            List<Menu> children =
                    repository.findByParentIdAndIsActiveTrueOrderByDisplayOrderAsc(
                            menu.getId()
                    );

            menu.setChildren(children);
        }

        return menus;
    }
}

package com.example.DashboardService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DashboardService.model.Menu;
import com.example.DashboardService.service.MenuService;

@RestController
@RequestMapping("/layout/menu")
public class MenuController {

    private MenuService service;

    public MenuController(MenuService service){
        this.service = service;
    }
    @GetMapping
    public ResponseEntity<List<Menu>> getMenus() {

        return ResponseEntity.ok(
                service.getMenus()
        );
    }
}

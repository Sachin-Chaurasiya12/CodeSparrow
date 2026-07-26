package com.example.DashboardService.model.DTO;

import java.util.List;

public class MenutoResponse {
    private int id;

    private String name;

    private String route;

    private String icon;

    private List<MenutoResponse> children;

    public List<MenutoResponse> getChildren() {
        return children;
    }
    public void setChildren(List<MenutoResponse> children) {
        this.children = children;
    }
    public String getIcon() {
        return icon;
    }public void setIcon(String icon) {
        this.icon = icon;
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }public void setId(int id) {
        this.id = id;
    }public String getRoute() {
        return route;
    }
    public void setName(String name) {
        this.name = name;
    }public void setRoute(String route) {
        this.route = route;
    }
}

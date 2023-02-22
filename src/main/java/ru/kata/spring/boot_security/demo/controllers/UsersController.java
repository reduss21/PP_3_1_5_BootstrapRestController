package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsersController {
    @GetMapping("/admin")
    public String openAdminPanel() {
        return "users";
    }

    @GetMapping("/user")
    public String showProfile() {
        return "user";
    }
}
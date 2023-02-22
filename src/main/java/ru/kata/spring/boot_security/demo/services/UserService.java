package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    void add(User user);
    void remove(long id);
    void update(User user);
    User getById(long id);
    User findByEmail(String email);
    List<User> listUsers();
}

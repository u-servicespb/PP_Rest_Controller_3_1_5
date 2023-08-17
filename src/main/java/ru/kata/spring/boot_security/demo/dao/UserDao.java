package ru.kata.spring.boot_security.demo.dao;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;


import java.util.List;

public interface UserDao extends UserDetailsService {

    List<User> findAll();

    User findByName(String username);

    User getUser(Long id);

    void saveUser(User user);

    void updateUser(User user);

    void deleteUser(Long id);
}

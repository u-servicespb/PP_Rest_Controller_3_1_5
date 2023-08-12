package ru.kata.spring.boot_security.demo.configs;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;

@Component
public class InitUsers {

    private final UserService userService;
    private final RoleService roleService;


    public InitUsers(UserService service, RoleService roleService) {
        this.userService = service;
        this.roleService = roleService;
    }

    @PostConstruct
    private void init() {
        User admin1 = new User("admin", 35, "admin");
        User user1 = new User("user", 30, "user");
        Role admin = new Role("ADMIN");
        Role user = new Role("USER");
        admin1.addRole(admin);
        user1.addRole(user);

        if (userService.getUser(admin1.getUsername()).isEmpty() && userService.getUser(user1.getUsername()).isEmpty()) {
            roleService.saveRole(admin);
            roleService.saveRole(user);
            userService.saveUser(admin1);
            userService.saveUser(user1);
        }
    }
}

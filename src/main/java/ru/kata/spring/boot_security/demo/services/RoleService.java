package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> listRoles();

    void saveRole(Role role);

    void deleteRole(long id);
}

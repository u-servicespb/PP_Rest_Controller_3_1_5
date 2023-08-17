package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleDao {

    public Role findRoleById(Long id);

    public List<Role> getAllRoles();

    List<Role> getRoles();

    public void save(Role role);
}

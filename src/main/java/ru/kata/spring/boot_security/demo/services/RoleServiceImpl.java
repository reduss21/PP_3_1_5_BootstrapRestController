package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) { this.roleRepository = roleRepository; }

    @Override
    @Transactional
    public void add(Role role) { this.roleRepository.save(role); }

    @Override
    @Transactional
    public void remove(long id) { this.roleRepository.deleteById(id); }

    @Override
    @Transactional
    public void update(Role role) { this.roleRepository.save(role); }

    @Override
    public Role getById(long id) { return this.roleRepository.findById(id); }

    @Override
    public List<Role> listRoles() {return this.roleRepository.findAll(); }
}

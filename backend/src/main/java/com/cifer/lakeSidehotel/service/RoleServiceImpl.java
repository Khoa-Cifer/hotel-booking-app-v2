package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.exception.RoleAlreadyExistException;
import com.cifer.lakeSidehotel.exception.UserNotFoundException;
import com.cifer.lakeSidehotel.model.Role;
import com.cifer.lakeSidehotel.model.User;
import com.cifer.lakeSidehotel.repository.RoleRepository;
import com.cifer.lakeSidehotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(theRole.getName() + " role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        this.removeAllUsersFromRole(id);
        roleRepository.deleteById(id);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UserNotFoundException("User not found !!!");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new RoleAlreadyExistException(
                    role.get().getName() + "is already assigned to " + user.get().getFirstName());
        }

        if (role.isPresent()) {
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }

        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long id) {
        Optional<Role> role = roleRepository.findById(id);
        role.get().removeAllUsersFromRole();
        return roleRepository.save(role.get());
    }
}
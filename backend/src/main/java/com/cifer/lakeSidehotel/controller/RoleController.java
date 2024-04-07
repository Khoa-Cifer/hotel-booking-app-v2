package com.cifer.lakeSidehotel.controller;

import com.cifer.lakeSidehotel.exception.RoleAlreadyExistException;
import com.cifer.lakeSidehotel.model.Role;
import com.cifer.lakeSidehotel.model.User;
import com.cifer.lakeSidehotel.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/roles")
public class RoleController {
    private final IRoleService roleService;

    @GetMapping("/all-roles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    @PostMapping("/create-new-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> createRole(@RequestBody Role theRole) {
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New role created successfully!");
        } catch (RoleAlreadyExistException re) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());

        }
    }

    @DeleteMapping("/delete/{roleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteRole(@PathVariable("roleId") Long roleId) {
        roleService.deleteRole(roleId);
    }

    @PostMapping("/remove-all-users-from-role/{roleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }

    @PostMapping("/remove-user-from-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User removeUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/assign-user-to-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User assignUserToRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return roleService.assignRoleToUser(userId, roleId);
    }
}

package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.exception.UserAlreadyExistException;
import com.cifer.lakeSidehotel.exception.UserNotFoundException;
import com.cifer.lakeSidehotel.model.Role;
import com.cifer.lakeSidehotel.model.User;
import com.cifer.lakeSidehotel.repository.RoleRepository;
import com.cifer.lakeSidehotel.repository.UserRepository;
import com.cifer.lakeSidehotel.request.RegistrationRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public User registerUser(RegistrationRequest newUser) {
        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new UserAlreadyExistException(newUser.getEmail() + " already exists");
        }
        User user = new User(newUser.getFirstName(), newUser.getLastName(), newUser.getEmail(), newUser.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_uSER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }

    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}

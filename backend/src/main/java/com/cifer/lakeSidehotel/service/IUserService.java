package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.exception.UserAlreadyExistException;
import com.cifer.lakeSidehotel.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user) throws UserAlreadyExistException;
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}

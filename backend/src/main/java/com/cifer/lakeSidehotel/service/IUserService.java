package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.exception.UserAlreadyExistException;
import com.cifer.lakeSidehotel.model.User;
import com.cifer.lakeSidehotel.request.RegistrationRequest;

import java.util.List;

public interface IUserService {
    User registerUser(RegistrationRequest newUser) throws UserAlreadyExistException;

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);
}

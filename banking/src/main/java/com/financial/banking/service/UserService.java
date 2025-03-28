package com.financial.banking.service;

import com.financial.banking.model.User;
import com.financial.banking.repository.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id)  throws DataAccessException {
        return userRepository.getUserById(id).orElse(null);
    }
}

package com.financial.banking.service;

import com.financial.banking.model.User;
import com.financial.banking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id)  throws DataAccessException {
        return userRepository.getUserById(id).orElse(null);
    }
}

package com.financial.banking.controller;

import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.User;
import com.financial.banking.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        log.info("---- Start getUserById ----");
        try {
            log.info("---- End getUserById ----");
            return userService.getUserById(id);
        }catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException("Failed to get user", e);
        }
    }

}

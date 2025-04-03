package com.financial.banking.controller;

import com.financial.banking.model.User;
import com.financial.banking.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

class UserControllerTest {
    @Mock
    UserService userService;
    @InjectMocks
    UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserById() {
        when(userService.getUserById(anyLong())).thenReturn(new User());
        User user = userController.getUserById(1L);
        User result = userController.getUserById(Long.valueOf(1));
        Assertions.assertEquals(user, result);
    }
}

package com.financial.banking.controller;

import com.financial.banking.model.Account;
import com.financial.banking.model.User;
import com.financial.banking.model.dto.LoginRequest;
import com.financial.banking.model.dto.LoginResponse;
import com.financial.banking.service.AccountService;
import com.financial.banking.util.JwtUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

import static org.mockito.Mockito.*;

class AuthControllerTest {
    @Mock
    AccountService accountService;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    JwtUtils jwtUtils;
    @InjectMocks
    AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin() {
        Account mockAccount = new Account();
        mockAccount.setUsername("admin");

        User mockUser = new User();
        mockUser.setName("Valerio");
        mockUser.setId(8L);
        mockAccount.setUser(mockUser);

        when(accountService.getAccountByName("admin")).thenReturn(mockAccount);
        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(null);
        when(jwtUtils.generateToken(any(Authentication.class))).thenReturn("generateTokenResponse");
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("admin");
        LoginResponse result = authController.login(loginRequest);
        Assertions.assertEquals(new LoginResponse(null, Long.valueOf(8)), result);
    }
}

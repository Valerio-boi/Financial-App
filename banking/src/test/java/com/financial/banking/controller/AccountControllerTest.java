package com.financial.banking.controller;

import com.financial.banking.model.Account;
import com.financial.banking.model.User;
import com.financial.banking.service.AccountService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;

class AccountControllerTest {
    @Mock
    AccountService accountService;
    @InjectMocks
    AccountController accountController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAccount() {
        Account account = new Account();
        account.setPassword("admin123");
        User user = new User();
        account.setUser(user);
        when(accountService.createAccount(any())).thenReturn(account);

        ResponseEntity<Account> result = accountController.createAccount(account);
        Assertions.assertEquals(new ResponseEntity<Account>(account, null, HttpStatus.OK), result);
    }
}

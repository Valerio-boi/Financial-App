package com.financial.banking.controller;

import com.financial.banking.exception.AccountNotFoundException;
import com.financial.banking.model.Account;
import com.financial.banking.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/public/")
@CrossOrigin(origins = "*")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/insert-account")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        log.info("---- Start createAccount ----");
        try {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            Account savedAccount = accountService.createAccount(account);
            log.info("---- End createAccount ----");
            return ResponseEntity.ok(savedAccount);
        }catch (AccountNotFoundException e){
            log.error(e.getMessage());
            throw new AccountNotFoundException("Failed to create account", e);
        }

    }

}

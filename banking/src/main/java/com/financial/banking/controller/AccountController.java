package com.financial.banking.controller;

import com.financial.banking.model.Account;
import com.financial.banking.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private AccountService accountService;

//    @GetMapping("/accounts")
//    public List<Account> getAllAccounts() {
//        return accountService.getAllAccounts();
//    }
//
//    @GetMapping("/accounts/{id}")
//    public Account getAccountById(@PathVariable Long id) {
//        return accountService.getAccountById(id);
//    }

    @PostMapping("/insert-account")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        Account savedAccount = accountService.createAccount(account);
        return ResponseEntity.ok(savedAccount);
    }

}

package com.financial.banking.service;

import com.financial.banking.model.Account;
import com.financial.banking.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    public Account getAccountByName(String username) {
        return accountRepository.findByUsername(username).orElse(null);
    }

    public Account createAccount(Account account) {
        return accountRepository.saveAndFlush(account);
    }

}

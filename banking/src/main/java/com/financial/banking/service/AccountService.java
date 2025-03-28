package com.financial.banking.service;

import com.financial.banking.exception.AccountNotFoundException;
import com.financial.banking.model.Account;
import com.financial.banking.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account getAccountByName(String username) throws AccountNotFoundException{
        return accountRepository.findByUsername(username).orElse(null);
    }

    public Account createAccount(Account account) throws AccountNotFoundException{
        return accountRepository.saveAndFlush(account);
    }

}

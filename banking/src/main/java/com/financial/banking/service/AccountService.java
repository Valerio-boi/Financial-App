package com.financial.banking.service;

import com.financial.banking.exception.AccountNotFoundException;
import com.financial.banking.model.Account;
import com.financial.banking.repository.AccountRepository;
import org.springframework.stereotype.Service;


@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account getAccountByName(String username) throws AccountNotFoundException{
        return accountRepository.findByUsername(username).orElse(null);
    }

    public Account createAccount(Account account) throws AccountNotFoundException{
        return accountRepository.saveAndFlush(account);
    }

}

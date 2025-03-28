package com.financial.banking.util;

import com.financial.banking.model.Account;
import com.financial.banking.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;


    public DataLoader(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
        if (accountRepository.findByUsername("admin").isEmpty()) {
            Account admin = new Account();
            admin.setUsername("admin");
            //Per motivi di sicurezza ho eliminato la passowrd da mettere nel caso dovesse servire
            accountRepository.save(admin);
        }
    }
}

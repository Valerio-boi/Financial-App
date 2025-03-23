package com.financial.banking.service;


import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("admin".equals(username)) {
            String password = "admin123";
            String encodedPassword = passwordEncoder.encode(password);

            return User.withUsername(username)
                    .password(encodedPassword)
                    .roles("ADMIN")
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }
}

package com.financial.banking.controller;

import com.financial.banking.model.Account;
import com.financial.banking.model.dto.LoginRequest;
import com.financial.banking.model.dto.LoginResponse;
import com.financial.banking.service.AccountService;
import com.financial.banking.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth/")
public class AuthController {

    @Autowired
    private AccountService accountService;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username, request.password)
        );

        Account account = accountService.getAccountByName(request.username);
        LoginResponse loginResponse = new LoginResponse(jwtUtils.generateToken(authentication), account.getUser().getId());
        return loginResponse;
    }

}

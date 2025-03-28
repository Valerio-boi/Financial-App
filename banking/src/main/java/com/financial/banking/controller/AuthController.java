package com.financial.banking.controller;

import com.financial.banking.model.Account;
import com.financial.banking.model.dto.LoginRequest;
import com.financial.banking.model.dto.LoginResponse;
import com.financial.banking.service.AccountService;
import com.financial.banking.util.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("api/auth/")
public class AuthController {

    private final AccountService accountService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserDetailsService userDetailsService, AccountService accountService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        log.info("---- Start login ----");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username, request.password)
        );

        Account account = accountService.getAccountByName(request.username);
        LoginResponse loginResponse = new LoginResponse(jwtUtils.generateToken(authentication), account.getUser().getId());
        log.info("---- End login ----");
        return loginResponse;
    }

}

package com.financial.banking.model.dto;

import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private Long userId;

    public LoginResponse(){}

    public LoginResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

}

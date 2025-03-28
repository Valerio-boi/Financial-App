package com.financial.banking.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginResponse implements Serializable {

    private String token;
    private Long userId;

    public LoginResponse(){}

    public LoginResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

}

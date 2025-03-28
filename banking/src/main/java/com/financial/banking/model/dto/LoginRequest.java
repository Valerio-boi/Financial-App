package com.financial.banking.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginRequest implements Serializable {
    public String username;
    public String password;
}

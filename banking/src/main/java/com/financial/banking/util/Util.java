package com.financial.banking.util;

import java.security.SecureRandom;
import java.util.Base64;

public class Util {

    private Util() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32];
        secureRandom.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }

}

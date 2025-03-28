package com.financial.banking.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Entity
@Table(name = "users")
@Data
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String cognome;

    @Column(unique = true)
    private String iban;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards = new ArrayList<>();

    @JsonManagedReference
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Account account;


    @PrePersist
    public void generateIban() {
        if (this.iban == null || this.iban.isEmpty()) {
            this.iban = generateRandomIban();
        }
    }
    private Random random = new Random();
    private String generateRandomIban() {
        String countryCode = "IT";
        String bankCode = "12345";
        String branchCode = "67890";
        String accountNumber = String.format("%012d", this.random.nextLong(999999999999L));

        return countryCode + bankCode + branchCode + accountNumber;
    }

}
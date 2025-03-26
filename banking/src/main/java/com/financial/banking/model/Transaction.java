package com.financial.banking.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String description;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;
}
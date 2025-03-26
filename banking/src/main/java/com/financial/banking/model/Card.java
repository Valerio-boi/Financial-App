package com.financial.banking.model;

import com.financial.banking.utilEnum.CardType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CardType type; // VIRTUAL, DEBIT, PREPAID

    private double balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();
}
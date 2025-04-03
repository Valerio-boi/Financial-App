package com.financial.banking.service;

import com.financial.banking.model.Card;
import com.financial.banking.model.Transaction;
import com.financial.banking.repository.CardRepository;
import com.financial.banking.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class TransactionService {

    private final TransactionRepository transactionRepository;

    private final CardRepository cardRepository;

    public TransactionService(TransactionRepository transactionRepository,CardRepository cardRepository ) {
        this.transactionRepository = transactionRepository;
        this.cardRepository = cardRepository;
    }

    public Transaction insertTransactionNegative(Transaction transaction) throws DataAccessException {
        Card carta = cardRepository.getCardsById(transaction.getCard().getId()).orElse(null);

        double balance = carta.getBalance();
        balance -= transaction.getAmount();
        cardRepository.updateBalanceById(carta.getId(),balance);

        return transactionRepository.saveAndFlush(transaction);

    }


    public Transaction insertTransactionPositive(Transaction transaction) throws DataAccessException {
        Card carta = cardRepository.getCardsById(transaction.getCard().getId()).orElse(null);

        double balance = carta.getBalance();
        balance += transaction.getAmount();
        cardRepository.updateBalanceById(carta.getId(),balance);

        return transactionRepository.saveAndFlush(transaction);

    }

    public void removeTransaction(Long id) throws DataAccessException  {
        Transaction transaction = transactionRepository.findById(id).orElse(null);
        Card carta = cardRepository.getCardsById(transaction.getCard().getId()).orElse(null);

        double balance = carta.getBalance();
        balance += transaction.getAmount();
        cardRepository.updateBalanceById(carta.getId(),balance);

        transactionRepository.deleteById(id);
    }

}

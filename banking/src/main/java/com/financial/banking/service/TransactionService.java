package com.financial.banking.service;

import com.financial.banking.model.Transaction;
import com.financial.banking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {


    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction insertTransaction(Transaction transaction) throws Exception {
        return transactionRepository.saveAndFlush(transaction);

    }

    public void removeTransaction(Long id) throws Exception {
        transactionRepository.deleteById(id);
    }

}

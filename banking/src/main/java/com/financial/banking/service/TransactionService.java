package com.financial.banking.service;

import com.financial.banking.model.Transaction;
import com.financial.banking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {


    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction insertTransaction(Transaction transaction) throws DataAccessException {
        return transactionRepository.saveAndFlush(transaction);

    }

    public void removeTransaction(Long id) throws DataAccessException  {
        transactionRepository.deleteById(id);
    }

}

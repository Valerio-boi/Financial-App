package com.financial.banking.repository;

import com.financial.banking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository  extends JpaRepository<Transaction, Long> {

    Optional<Transaction> getTransactionById(Long id);

}

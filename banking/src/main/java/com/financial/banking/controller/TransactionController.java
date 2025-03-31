package com.financial.banking.controller;

import com.financial.banking.constants.Constants;
import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.Transaction;
import com.financial.banking.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @PostMapping("/insert-transaction")
    public ResponseEntity<Transaction> insertTransaction(@RequestBody Transaction transaction) {
        log.info("---- Start insertTransaction ----");
        Transaction tra = null;
        try {
            tra = transactionService.insertTransactionNegative(transaction);
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
        log.info("---- End insertTransaction ----");
        return ResponseEntity.ok(tra);
    }


    @PostMapping("/insert-transaction-positive")
    public ResponseEntity<Transaction> insertTransactionPositive(@RequestBody Transaction transaction) {
        log.info("---- Start insertTransaction ----");
        Transaction tra = null;
        try {
            tra = transactionService.insertTransactionPositive(transaction);
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
        log.info("---- End insertTransaction ----");
        return ResponseEntity.ok(tra);
    }

    @DeleteMapping(value = "/delete-transaction", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>>  deleteTransaction(@RequestParam Long id) {
        log.info("---- Start deleteTransaction ----");
        try {
            transactionService.removeTransaction(id);
            log.info("---- End deleteTransaction ----");
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Transaction deleted successfully"));
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
    }

}

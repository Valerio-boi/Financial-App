package com.financial.banking.controller;

import com.financial.banking.model.Transaction;
import com.financial.banking.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @PostMapping("/insert-transaction")
    public ResponseEntity<Transaction> insertTransaction(@RequestBody Transaction transaction) {
        Transaction tra = null;
        try {
            tra = transactionService.insertTransaction(transaction);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(tra);
    }

    @DeleteMapping(value = "/delete-transaction", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>  deleteTransaction(@RequestParam Long id) {
        try {
            transactionService.removeTransaction(id);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Transaction deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", "Failed to delete transaction"));
        }
    }

}

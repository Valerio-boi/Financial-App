package com.financial.banking.controller;

import com.financial.banking.model.Transaction;
import com.financial.banking.service.TransactionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.mockito.Mockito.*;

class TransactionControllerTest {
    @Mock
    TransactionService transactionService;
    @InjectMocks
    TransactionController transactionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testInsertTransaction() {
        when(transactionService.insertTransactionNegative(any(Transaction.class))).thenReturn(new Transaction());

        ResponseEntity<Transaction> result = transactionController.insertTransaction(new Transaction());
        Assertions.assertEquals(new ResponseEntity<Transaction>(new Transaction(), HttpStatus.OK), result);
    }

    @Test
    void testInsertTransactionPositive() {
        when(transactionService.insertTransactionPositive(any(Transaction.class))).thenReturn(new Transaction());
        ResponseEntity<Transaction> result = transactionController.insertTransactionPositive(new Transaction());
        Assertions.assertEquals(new ResponseEntity<Transaction>(new Transaction(), HttpStatus.OK), result);

    }

    @Test
    void testDeleteTransaction() {
        doNothing().when(transactionService).removeTransaction(anyLong());

        ResponseEntity<Map<String, String>> result = transactionController.deleteTransaction(Long.valueOf(1));
        verify(transactionService).removeTransaction(anyLong());
        Assertions.assertEquals(new ResponseEntity<Map<String, String>>(Map.of("message", "Transaction deleted successfully"), HttpStatus.OK), result);
    }
}

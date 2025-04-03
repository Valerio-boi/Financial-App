package com.financial.banking.controller;

import com.financial.banking.model.Finanziamenti;
import com.financial.banking.model.dto.FinaziamentoRequest;
import com.financial.banking.service.FinanziamentiService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;

class FinanziamentiControllerTest {
    @Mock
    FinanziamentiService finanziamentiService;
    @InjectMocks
    FinanziamentiController finanziamentiController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testInsertFinanziamento() {
        doNothing().when(finanziamentiService).insertFinanziamento(any(FinaziamentoRequest.class));

        ResponseEntity<Map<String, String>> result = finanziamentiController.insertFinanziamento(new FinaziamentoRequest());

        verify(finanziamentiService).insertFinanziamento(any(FinaziamentoRequest.class));
        Assertions.assertEquals(new ResponseEntity<Map<String, String>>(Map.of("message", "Finanziamento emmesso con successo"), HttpStatus.OK), result);
    }

    @Test
    void testPayRata() {
        when(finanziamentiService.updateCountRata(anyLong())).thenReturn(Long.valueOf(1));
        ResponseEntity<Map<String, String>> result = finanziamentiController.payRata(Long.valueOf(1));
        verify(finanziamentiService).deleteFinanziamentoById(anyLong());
        Assertions.assertEquals(new ResponseEntity<Map<String, String>>(Map.of("message", "Finanziamento concluso con successo"), HttpStatus.OK), result);
    }

    @Test
    void testGetFinanziamentoById() {
        when(finanziamentiService.getFinanziamentiById(anyLong())).thenReturn(Optional.of(new Finanziamenti()));

        ResponseEntity<Finanziamenti> result = finanziamentiController.getFinanziamentoById(Long.valueOf(1));
        Assertions.assertEquals(new ResponseEntity<Finanziamenti>(new Finanziamenti(), HttpStatus.OK), result);
    }
}

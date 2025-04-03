package com.financial.banking.controller;

import com.financial.banking.model.Card;
import com.financial.banking.service.CardService;
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

class CardControllerTest {
    @Mock
    CardService cardService;
    @InjectMocks
    CardController cardController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserById() {
        when(cardService.getCardById(anyLong())).thenReturn(new Card());

        Card result = cardController.getUserById(Long.valueOf(1));
        Assertions.assertEquals(new Card(), result);
    }

    @Test
    void testUpdateCard() {
        doNothing().when(cardService).updateCard(any(Card.class));
        ResponseEntity<Map<String, String>> result = cardController.updateCard(new Card());
        verify(cardService).updateCard(any(Card.class));
        Assertions.assertEquals(new ResponseEntity<Map<String, String>>(Map.of("message", "Card updated successfully"), HttpStatus.OK), result);
    }
}

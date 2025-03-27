package com.financial.banking.controller;

import com.financial.banking.model.Card;
import com.financial.banking.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/get-card")
    public Card getUserById(@RequestParam Long id) {
        return cardService.getCardById(id);
    }


    @PostMapping(value = "/update-balance", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateCard(@RequestBody Card card) {
        try {
            cardService.updateCard(card);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Card updated successfully"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", "Failed to update card"));
        }
    }

}

package com.financial.banking.controller;

import com.financial.banking.constants.Constants;
import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.Card;
import com.financial.banking.service.CardService;
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
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/get-card")
    public Card getUserById(@RequestParam Long id) {
        log.info("---- Start getUserById ----");
        try{
            log.info("---- End getUserById ----");
            return cardService.getCardById(id);
        }catch (DatabaseException e){
            log.error(e.getMessage());
            throw new DatabaseException("Failed to get card", e);
        }
    }


    @PostMapping(value = "/update-balance", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> updateCard(@RequestBody Card card) {
        log.info("---- Start updateCard ----");
        try {
            cardService.updateCard(card);
            log.info("---- End updateCard ----");
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Card updated successfully"));
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
    }

}

package com.financial.banking.controller;


import com.financial.banking.constants.Constants;
import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.Finanziamenti;
import com.financial.banking.model.dto.FinaziamentoRequest;
import com.financial.banking.service.FinanziamentiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class FinanziamentiController {

    private final FinanziamentiService finanziamentiService;

    public FinanziamentiController(FinanziamentiService finanziamentiService) {
        this.finanziamentiService = finanziamentiService;
    }


    @PostMapping(value = "/insert-finanziamento")
    public ResponseEntity<Map<String, String>> insertFinanziamento(@RequestBody FinaziamentoRequest finanziamenti) {
        log.info("---- Start insertFinanziamento ----");
        try {
            finanziamentiService.insertFinanziamento(finanziamenti);
            log.info("---- End insertFinanziamento ----");
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Finanziamento emmesso con successo"));
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
    }

    @PostMapping(value = "/pay-finanziamento")
    public ResponseEntity<Map<String, String>> payRata(@RequestBody Long id) {
        log.info("---- Start payRata ----");
        try {
            Long delete = finanziamentiService.updateCountRata(id);
            if(delete >  0 ) {
                log.info("---- End payRata eliminooooooooooo ----");
                finanziamentiService.deleteFinanziamentoById(id);
                return ResponseEntity.ok().body(Collections.singletonMap("message", "Finanziamento concluso con successo"));
            }
            log.info("---- End payRata ----");
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Rata pagata con successo"));
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
    }


    @GetMapping(value = "/finanziamento")
    public ResponseEntity<Finanziamenti> getFinanziamentoById(@RequestParam  Long id) {
        log.info("---- Start getFinanziamentoById ----");
        try {
            Finanziamenti finanziamento = finanziamentiService.getFinanziamentiById(id).orElse(null);
            log.info("---- End getFinanziamentoById ----");
            return ResponseEntity.ok().body(finanziamento);
        } catch (DatabaseException e) {
            log.error(e.getMessage());
            throw new DatabaseException(Constants.ERRORE_DATA_BASE, e);
        }
    }

}

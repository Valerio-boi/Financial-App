package com.financial.banking.service;


import com.financial.banking.model.Finanziamenti;
import com.financial.banking.repository.FinanziamentiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FinanziamentiService {

    private final FinanziamentiRepository finanziamentiRepository;

    public FinanziamentiService(FinanziamentiRepository finanziamentiRepository) {
        this.finanziamentiRepository = finanziamentiRepository;
    }

    public void insertFinanziamento(Finanziamenti finanziamenti) {

        finanziamentiRepository.saveAndFlush(finanziamenti);

    }

}

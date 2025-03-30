package com.financial.banking.service;


import com.financial.banking.model.Card;
import com.financial.banking.model.Finanziamenti;
import com.financial.banking.model.User;
import com.financial.banking.model.dto.FinaziamentoRequest;
import com.financial.banking.repository.CardRepository;
import com.financial.banking.repository.FinanziamentiRepository;
import com.financial.banking.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class FinanziamentiService {

    private final FinanziamentiRepository finanziamentiRepository;
    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public FinanziamentiService(FinanziamentiRepository finanziamentiRepository, CardRepository cardRepository, UserRepository userRepository) {
        this.finanziamentiRepository = finanziamentiRepository;
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    public void insertFinanziamento(FinaziamentoRequest finanziamenti) {
        Optional<User> user = userRepository.findById(finanziamenti.getUserId());
        Optional<Card> card = cardRepository.findById(finanziamenti.getCardId());

        if (user.isPresent() && card.isPresent()) {
            Finanziamenti finanziamento = new Finanziamenti();
            finanziamento.setCapitale(finanziamenti.getCapitale());
            finanziamento.setCostoMensile(finanziamenti.getCostoMensile());
            finanziamento.setTotRate(finanziamenti.getTotRate());
            finanziamento.setRatePagate(finanziamenti.getRatePagate());
            finanziamento.setUser(user.get());
            finanziamento.setCard(card.get());

            double balance = card.get().getBalance();
            balance += finanziamenti.getCapitale();
            cardRepository.updateBalanceById(finanziamenti.getCardId(),balance);

            finanziamentiRepository.save(finanziamento);
        }

    }

}

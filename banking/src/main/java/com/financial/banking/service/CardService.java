package com.financial.banking.service;


import com.financial.banking.model.Card;
import com.financial.banking.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;


    public Card getCardById(Long id) {
        return cardRepository.getCardsById(id).orElse(null);
    }

    public void updateCard(Card card) {
        cardRepository.updateBalanceById(card.getId(), card.getBalance());
    }

}

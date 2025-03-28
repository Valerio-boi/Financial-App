package com.financial.banking.service;


import com.financial.banking.model.Card;
import com.financial.banking.repository.CardRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }


    public Card getCardById(Long id) throws DataAccessException {
        return cardRepository.getCardsById(id).orElse(null);
    }

    public void updateCard(Card card) throws DataAccessException {
        cardRepository.updateBalanceById(card.getId(), card.getBalance());
    }

}

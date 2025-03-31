package com.financial.banking.service;


import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.Card;
import com.financial.banking.model.Finanziamenti;
import com.financial.banking.model.User;
import com.financial.banking.model.dto.FinaziamentoRequest;
import com.financial.banking.repository.CardRepository;
import com.financial.banking.repository.FinanziamentiRepository;
import com.financial.banking.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    public void insertFinanziamento(FinaziamentoRequest finanziamenti)  throws DatabaseException {
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

    @Transactional
    public Long updateCountRata(Long id) throws DatabaseException {
        Optional<Finanziamenti> finanziamentoOpt = finanziamentiRepository.findById(id);

        if (finanziamentoOpt.isEmpty()) {
            log.warn("Finanziamento con ID " + id + " non trovato");
            throw new DatabaseException("Finanziamento non trovato");
        }

        Finanziamenti finanziamento = finanziamentoOpt.get();
        int ratePagate = finanziamento.getRatePagate() + 1;

        log.info("Rata Pagate: " + ratePagate + ", Totale Rate: " + finanziamento.getTotRate());

        if (ratePagate == finanziamento.getTotRate()) {
            log.info("Eliminazione finanziamento con ID " + id);
            return id;
        } else {
            finanziamentiRepository.updateCountRata(id, ratePagate);
            finanziamentiRepository.flush();
            log.info("Rata aggiornata.");
            return 0L;
        }
    }

    public Optional<Finanziamenti> getFinanziamentiById(Long id) {
        return finanziamentiRepository.findById(id);
    }

    public void deleteFinanziamentoById(Long id) {
        Finanziamenti finanziamento = finanziamentiRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Finanziamento non trovato"));

        if (finanziamento.getCard() != null) {
            finanziamento.getCard().setFinanziamenti(null);
        }
        if (finanziamento.getUser() != null) {
            finanziamento.getUser().setFinanziamenti(null);
        }

        finanziamentiRepository.deleteById(id);
    }

}

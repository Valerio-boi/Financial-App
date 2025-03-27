package com.financial.banking.repository;

import com.financial.banking.model.Card;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> getCardsById(Long id);
    @Modifying
    @Transactional
    @Query("UPDATE Card c SET c.balance = :balance WHERE c.id = :id")
    void updateBalanceById(@Param("id") Long id, @Param("balance") Double balance);
}

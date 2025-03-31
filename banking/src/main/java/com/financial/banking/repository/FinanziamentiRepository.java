package com.financial.banking.repository;

import com.financial.banking.model.Finanziamenti;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanziamentiRepository extends JpaRepository<Finanziamenti, Long> {


    @Modifying
    @Transactional
    @Query("UPDATE Finanziamenti c SET c.ratePagate = :ratePagata WHERE c.id = :id")
    void updateCountRata(@Param("id") Long id, @Param("ratePagata") int ratePagata);


}

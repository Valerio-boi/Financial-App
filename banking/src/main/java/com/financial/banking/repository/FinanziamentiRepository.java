package com.financial.banking.repository;

import com.financial.banking.model.Finanziamenti;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanziamentiRepository extends JpaRepository<Finanziamenti, Long> {
}

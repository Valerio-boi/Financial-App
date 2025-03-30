package com.financial.banking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
public class Finanziamenti implements Serializable {

    @Id
    private Long id;
    private double capitale;
    private int totRate;
    private int ratePagate;
    private int costoMensile;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


}

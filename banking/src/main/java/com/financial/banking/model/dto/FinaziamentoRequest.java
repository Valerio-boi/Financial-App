package com.financial.banking.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class FinaziamentoRequest implements Serializable {

    private double capitale;
    private int totRate;
    private int ratePagate;
    private int costoMensile;
    private Long userId;
    private Long cardId;

}

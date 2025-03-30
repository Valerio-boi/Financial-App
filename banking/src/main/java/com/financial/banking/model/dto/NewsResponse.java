package com.financial.banking.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class NewsResponse implements Serializable {

    private NewsDTO[] data;

}

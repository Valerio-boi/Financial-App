package com.financial.banking.model.dto;

import lombok.Data;

@Data
public class NewsDTO {

    private String id;
    private String imageUrl;
    private String title;
    private String description;
    private String publishedAt;

}

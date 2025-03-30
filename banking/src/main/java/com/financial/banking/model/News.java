package com.financial.banking.model;

import com.financial.banking.model.dto.NewsDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;


@Data
@Entity
public class News implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imgUrl;
    private String title;
    private String content;
    private ZonedDateTime publishedAt;

    public News(NewsDTO dto) {
        this.imgUrl = dto.getImage_url();
        this.title = dto.getTitle();
        this.content = dto.getDescription();
    }

    public News() {

    }
}

package com.financial.banking.controller;


import com.financial.banking.constants.Constants;
import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.News;
import com.financial.banking.model.Transaction;
import com.financial.banking.service.NewsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/private/")
@CrossOrigin(origins = "*")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }



    @GetMapping("/get-news")
    public ResponseEntity<List<News>> getNews() {
        return ResponseEntity.ok(newsService.getNewsFromDatabase());
    }

}

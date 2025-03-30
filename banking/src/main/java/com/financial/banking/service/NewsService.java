package com.financial.banking.service;


import com.financial.banking.exception.DatabaseException;
import com.financial.banking.model.News;
import com.financial.banking.model.dto.NewsResponse;
import com.financial.banking.repository.NewsRepository;
import org.springframework.web.client.RestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class NewsService {
    private final String API_URL = "https://api.marketaux.com/v1/news/all";
    private final String  API_TOKEN = "uOolCbU4AangzAY8lciDekXkpsVSlNzrN7oufb3K";

    private final NewsRepository newsRepository;
    private final RestTemplate restTemplate;


    public NewsService(NewsRepository newsRepository, RestTemplate restTemplate) {
        this.newsRepository = newsRepository;
        this.restTemplate = restTemplate;
    }

    public void insertNews(News news) throws DatabaseException {
        newsRepository.saveAndFlush(news);
    }

    public List<News> getNewsFromDatabase() {
        return newsRepository.findAll();
    }

    @Scheduled(fixedRate = 1800000) // Ogni 30 minuti
    public void fetchAndSaveNews() {
        String url = API_URL + "?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=" + API_TOKEN;

        try {
            NewsResponse response = restTemplate.getForObject(url, NewsResponse.class);
            if (response != null && response.getData() != null) {
                List<News> newsList = Arrays.stream(response.getData())
                        .map(News::new)
                        .toList();

                newsRepository.saveAll(newsList);
                log.info("✅ News aggiornate nel DB!");
            }
        } catch (Exception e) {
            log.error("⚠️ Errore nel recupero delle news: " + e.getMessage());
        }
    }

}

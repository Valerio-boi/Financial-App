package com.financial.banking.controller;

import com.financial.banking.model.News;
import com.financial.banking.model.dto.NewsDTO;
import com.financial.banking.service.NewsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.mockito.Mockito.*;

class NewsControllerTest {
    @Mock
    NewsService newsService;
    @InjectMocks
    NewsController newsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNews() {
        when(newsService.getNewsFromDatabase()).thenReturn(List.of(new News(new NewsDTO())));

        ResponseEntity<List<News>> result = newsController.getNews();
        Assertions.assertEquals(new ResponseEntity<List<News>>(List.of(new News(new NewsDTO())), HttpStatus.OK), result);
    }
}

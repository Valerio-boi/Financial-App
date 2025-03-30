import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { CardBankComponent } from '../bankCard/card-bank.component';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  newsList: News[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.fetchNewsFromDB();
  }

  fetchNewsFromDB() {
    this.newsService.getNews().subscribe({
      next: (news) => (this.newsList = news),
      error: (err) => console.error('Errore nel recupero delle news dal DB:', err),
    });
  }
}

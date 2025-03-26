import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { CardBankComponent } from '../bankCard/card-bank.component';

@Component({
  selector: 'app-news',
  imports: [CommonModule, CardBankComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  newsList: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getFinancialNews().subscribe({
      next: (data) => (this.newsList = data.data),
      error: (err) => console.error('Errore nel recupero delle news:', err),
    });
  }
}

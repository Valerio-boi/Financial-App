import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { CardNewsComponent } from '../card-news/card-news.component';

@Component({
  selector: 'app-news',
  imports: [CommonModule, CardNewsComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsList: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getFinancialNews().subscribe({
      next: (data) => this.newsList = data.data,
      error: (err) => console.error('Errore nel recupero delle news:', err)
    });
  }

}

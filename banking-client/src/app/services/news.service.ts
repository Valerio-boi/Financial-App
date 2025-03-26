import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private API_URL = 'https://api.marketaux.com/v1/news/all';
  private API_TOKEN = 'uOolCbU4AangzAY8lciDekXkpsVSlNzrN7oufb3K';

  constructor(private http: HttpClient) {}

  getFinancialNews(): Observable<any> {
    const params = {
      symbols: 'TSLA,AMZN,MSFT',
      filter_entities: 'true',
      language: 'en',
      api_token: this.API_TOKEN
    };

    return this.http.get<any>(this.API_URL, { params });
  }
}

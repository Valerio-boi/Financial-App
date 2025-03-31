import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinancialDataService {
  private apiKey = '5FXR49WD0FMWAOFQ';

  constructor(private http: HttpClient) {}

  getHistoricalData(symbol: string, interval: string): Observable<any> {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
    return this.http.get(url); // Restituisce un Observable con i dati
  }
}

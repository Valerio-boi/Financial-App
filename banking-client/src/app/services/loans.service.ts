import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private apiUrl = 'http://localhost:8080/api/private/insert-finanziamento'; 
  private apiUrlGet = 'http://localhost:8080/api/private/finanziamento'; 

  constructor(private http: HttpClient) {}

  insertLoan(loanData: any): Observable<any> {
    const credentials = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    });

    return this.http.post<any>(this.apiUrl, loanData, { headers });
  }



  getLoansById(id: number): Observable<any> {
    const credentials = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });

    return this.http.get<any>(`${this.apiUrlGet}?id=${id}`, {headers});
  }

}

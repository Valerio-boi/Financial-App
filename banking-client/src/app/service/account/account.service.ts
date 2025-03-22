import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/account';

  constructor(private http: HttpClient) { }

  getAccountDetails(): Observable<any> {
    return this.http.get(this.apiUrl);  // Sostituisci con l'endpoint reale
  }
}

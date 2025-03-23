import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
  
    return this.http.post(this.apiUrl, null, { params });
  }


  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }


  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  
  logout(): void {
    localStorage.removeItem('authToken');
  }
}

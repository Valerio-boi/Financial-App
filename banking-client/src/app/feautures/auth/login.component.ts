import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: '',
  };

  router = inject(Router);
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth/login';

  onLogin() {
    debugger;
    this.http
      .post(
        `${this.apiUrl}?username=${this.loginObj.username}&password=${this.loginObj.password}`,
        {},
        { responseType: 'text' },
      )
      .subscribe({
        next: (token: string) => {
          console.log('Login Success!', token);
          localStorage.setItem('jwt_token', token);
          this.router.navigateByUrl('/home/dashboard');
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Credenziali errate');
        },
      });
  }
}

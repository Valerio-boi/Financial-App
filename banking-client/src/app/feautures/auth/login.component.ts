import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  registerData: RegisterRequest = {
    username: '',
    password: '',
    user: {
      name: '',
      email: '',
      cognome: '',
      cards: [
        { type: 'DEBIT', balance: 0.0 },
        { type: 'VIRTUAL', balance: 0.0 },
        { type: 'PREPAID', balance: 0.0 },
      ],
    },
  };

  constructor(
    private authService: AuthService,
    private registerService: RegisterService,
  ) {}
  router = inject(Router);

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('user_id', response.userId.toString());
        localStorage.setItem(
          'token',
          btoa(this.username + ':' + this.password),
        );
        this.router.navigateByUrl('/home/dashboard');
        console.log('tutto apposto eh');
      },
      error: (err) => {
        console.error('Errore di login:', err);
        alert('Credenziali errate');
      },
    });
  }

  onRegister() {
    this.registerService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registrazione avvenuta con successo:', response);
      },
      error: (error) => {
        console.error('Errore nella registrazione:', error);
      },
    });
  }
}

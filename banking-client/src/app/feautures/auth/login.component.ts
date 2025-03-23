import { Component } from '@angular/core';
import { AuthService } from '../../core/services/login/auth.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css']  // Correzione da 'styleUrl' a 'styleUrls'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        this.errorMessage = 'Credenziali errate';
      }
    );  
  }
}

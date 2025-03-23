import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from './core/services/account/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'banking-client';
  accountDetails$!: Observable<any>; // Mantieni un observable per i dati

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // Assegna direttamente l'Observable senza usare .subscribe()
    this.accountDetails$ = this.accountService.getAccountDetails();

    // Logga l'Observable per vedere che è stato assegnato correttamente
    console.log('Observable assegnato:', this.accountDetails$);
  }
}

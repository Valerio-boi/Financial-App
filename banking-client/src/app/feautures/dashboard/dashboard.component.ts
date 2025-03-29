import { Component, OnInit } from '@angular/core';
import { CardBankComponent } from '../../components/bankCard/card-bank.component';
import { ToolTipComponent } from '../../components/tool-tip/tool-tip.component';
import { NewsComponent } from '../../components/news/news.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardBankComponent,
    ToolTipComponent,
    NewsComponent,
    TransactionComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id'); 
    if (userId) {
      this.userService.getUserById(parseInt(userId)).subscribe({
        next: (data) => {
          console.log('User Data:', data);
          this.userData = data;
        },
        error: (error) => {
          console.error('Errore nel recupero utente', error);
        }
      });
    }
  }


}

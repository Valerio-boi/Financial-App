import { Component, OnInit } from '@angular/core';
import { CardBankComponent } from '../../components/bankCard/card-bank.component';
import { ToolTipComponent } from '../../components/tool-tip/tool-tip.component';
import { NewsComponent } from '../../components/news/news.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardBankComponent,
    ToolTipComponent,
    NewsComponent,
    TransactionComponent,
  ],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  user:any = null;
  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserById(parseInt(userId)).subscribe({
        next: (data) => {
          this.userService.setUser(data)
        },
        error: (error) => {
          console.error('Errore nel recupero utente', error);
        },
      });
    }

    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  getAllTransactions() {
    return this.user?.cards.flatMap((card:any) => 
      card.transactions.map((transaction:any) => ({
        ...transaction, 
        cardType: card.type
        ,formattedDate: this.formatDate(transaction.timestamp)
      }))
    ) || [];
  }


  formatDate(date: any): string {
    if (Array.isArray(date)) {
      const formattedDate = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
      return this.datePipe.transform(formattedDate, 'dd-MM-yyyy') || 'Data non disponibile';
    }

    const parsedDate = new Date(date);
    return this.datePipe.transform(parsedDate, 'dd-MM-yyyy') || 'Data non disponibile';
  }

}

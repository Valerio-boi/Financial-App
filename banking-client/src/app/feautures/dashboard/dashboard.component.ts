import { Component, OnInit } from '@angular/core';
import { CardBankComponent } from '../../components/bankCard/card-bank.component';
import { ToolTipComponent } from '../../components/tool-tip/tool-tip.component';
import { NewsComponent } from '../../components/news/news.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartExpensesComponent } from "../../components/chart-expenses/chart-expenses.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardBankComponent,
    ToolTipComponent,
    NewsComponent,
    TransactionComponent,
    ChartExpensesComponent,
    CommonModule
  ],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  user: any = null;
  transactions: any[] = [];
  transactionsLoaded: boolean = false;
  private userSubscription!: Subscription;

  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadUser();

    this.userSubscription = this.userService.onUserUpdate().subscribe(() => {
      this.loadUser();
    });
  }

  loadUser() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserById(parseInt(userId)).subscribe({
        next: (data) => {
          this.userService.setUser(data);
          this.user = data;
          this.loadTransactions();
        },
        error: (error) => console.error('Errore nel recupero utente', error)
      });
    }
  }

  loadTransactions() {
    if (this.user && this.user.cards) {
      this.transactions = this.getAllTransactions();
      this.transactionsLoaded = true;
      console.log('Transazioni caricate:', this.transactions);
    }
  }

  getAllTransactions() {
    return this.user?.cards.flatMap((card: any) =>
      card.transactions.map((transaction: any) => ({
        ...transaction,
        cardType: card.type,
        formattedDate: this.formatDate(transaction.timestamp),
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

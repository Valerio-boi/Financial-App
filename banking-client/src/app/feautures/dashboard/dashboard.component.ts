import { Component, OnInit } from '@angular/core';
import { CardBankComponent } from '../../components/bankCard/card-bank.component';
import { ToolTipComponent } from '../../components/tool-tip/tool-tip.component';
import { NewsComponent } from '../../components/news/news.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartExpensesComponent } from "../../components/chart-expenses/chart-expenses.component";

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

  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit() {
    // Verifica se l'ID dell'utente è presente
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserById(parseInt(userId)).subscribe({
        next: (data) => {
          this.userService.setUser(data);
          // Dopo che l'utente è stato caricato, carica le transazioni
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Errore nel recupero utente', error);
        },
      });
    }

    // Ascolta gli aggiornamenti dell'utente
    this.userService.user$.subscribe(user => {
      this.user = user;
      // Carica le transazioni se non sono già caricate
      if (!this.transactionsLoaded && this.user?.cards?.length) {  // Controlla se le carte dell'utente sono disponibili
        this.loadTransactions();
      }
    });
  }

  // Funzione per caricare le transazioni
  loadTransactions() {
    if (this.user && this.user.cards) {
      this.transactions = this.getAllTransactions();
      this.transactionsLoaded = true;
      console.log('Transazioni caricate:', this.transactions);
    }
  }

  // Estrai tutte le transazioni dall'utente
  getAllTransactions() {
    return this.user?.cards.flatMap((card: any) =>
      card.transactions.map((transaction: any) => ({
        ...transaction,
        cardType: card.type,
        formattedDate: this.formatDate(transaction.timestamp),
      }))
    ) || [];
  }

  // Funzione per formattare la data
  formatDate(date: any): string {
    if (Array.isArray(date)) {
      const formattedDate = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
      return this.datePipe.transform(formattedDate, 'dd-MM-yyyy') || 'Data non disponibile';
    }

    const parsedDate = new Date(date);
    return this.datePipe.transform(parsedDate, 'dd-MM-yyyy') || 'Data non disponibile';
  }

}

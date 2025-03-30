import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  @Input() transactions: any[] = [];

  transaction = {
    amount: 0,
    description: '',
    timestamp: new Date().toISOString(),
    categoria: 'Categoria',
    cardType: 'Carta'
  };

  page: number = 1;
  itemsPerPage: number = 6;


  submitTransaction() {
    const selectedCard = this.getSelectedCard();

    const transactionData = {
      amount: this.transaction.amount,
      description: this.transaction.description,
      timestamp: this.transaction.timestamp,
      categoria: this.transaction.categoria,
      card: selectedCard
    };

    const credentials = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });
 
    this.http.post('http://localhost:8080/api/private/insert-transaction', transactionData, {headers})
      .subscribe({
        next: (response) => {
          console.log('Transazione inserita con successo', response);
          this.userService.notifyUserUpdate(); 
          this.resetForm();
        },
        error: (error) => {
          console.error('Errore durante l\'inserimento della transazione', error);
        }
      });
  }

  getSelectedCard() {
    const selectedCardType = this.transaction.cardType;
    const card = this.userService.getUser().cards.find((card: any) => card.type === selectedCardType);
  
    if (card) {
      return { id: card.id }; // Invia solo l'ID della carta
    }
    return null;
  }

  resetForm() {
    // Resetta i valori del form
    this.transaction = {
      amount: 0,
      description: '',
      timestamp: new Date().toISOString(),
      categoria: '',
      cardType: ''
    };
  }


  deleteTransaction(transactionId: number) {
    if (confirm('Sei sicuro di voler eliminare questa transazione?')) {
      const credentials = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
      });

      this.http
        .delete(`http://localhost:8080/api/private/delete-transaction?id=${transactionId}`, { headers })
        .subscribe({
          next: () => {
            this.transactions = this.transactions.filter(t => t.id !== transactionId);
            console.log(`Transazione con ID ${transactionId} eliminata`);
            this.userService.notifyUserUpdate(); 
          },
          error: (err) => console.error('Errore eliminazione transazione', err),
        });
    }
  }

}

import { Component } from '@angular/core';
import { ButtonTransactionComponent } from '../button-transaction/button-transaction.component';

@Component({
  selector: 'app-transaction',
  imports: [ButtonTransactionComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {}

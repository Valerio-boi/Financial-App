import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-transaction',
  imports: [],
  templateUrl: './button-transaction.component.html',
  styleUrl: './button-transaction.component.css',
})
export class ButtonTransactionComponent {
  @Input() label!: string;
}

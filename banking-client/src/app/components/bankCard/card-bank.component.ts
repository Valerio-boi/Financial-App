import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-bank',
  imports: [],
  templateUrl: './card-bank.component.html',
  styleUrl: './card-bank.component.css',
})
export class CardBankComponent {
  @Input() diffStyle!: string;
}

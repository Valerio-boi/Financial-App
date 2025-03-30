import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loans',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent implements OnInit {
  currency: string = 'EUR';
  amount: number = 20000;
  period: number = 12;
  riskLevels = [
    { from: 0.02, to: 0.04 },
    { from: 0.04, to: 0.06 },
    { from: 0.06, to: 0.07 },
    { from: 0.07, to: 0.085 },
    { from: 0.085, to: 0.095 },
    { from: 0.095, to: 0.115 }
  ];
  risk: { from: number, to: number } = this.riskLevels[0];

  ngOnInit() {
    this.calculateLoan();
  }

  formatter(num: number): string {
    return num.toFixed(0).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  setCurrency(event: any) {
    this.currency = event.target.value;
    this.calculateLoan();
  }

  setAmount(event: any) {
    this.amount = parseInt(event.target.value);
    this.calculateLoan();
  }

  setPeriod(event: any) {
    this.period = parseInt(event.target.value);
    this.calculateLoan();
  }

  setRiskLevel(index: number) {
    this.risk = this.riskLevels[index];
    this.calculateLoan();
  }

  calculateMonthlyCost(risk: number): number {
    const i = risk / 12;
    return this.amount * (i + (i / (Math.pow((1 + i), this.period) - 1)));
  }

  calculateLoan() {
    const A1 = this.calculateMonthlyCost(this.risk.from);
    const A2 = this.calculateMonthlyCost(this.risk.to);
    this.total = `${this.currency} ${this.formatter(A1)} - ${this.formatter(A2)}`;
  }

  total: string = '';

}

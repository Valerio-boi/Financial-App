import { Component } from '@angular/core';
import { CardBankComponent } from '../../components/bankCard/card-bank.component';
import { ToolTipComponent } from '../../components/tool-tip/tool-tip.component';
import { NewsComponent } from '../../components/news/news.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';

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
export class DashboardComponent {}

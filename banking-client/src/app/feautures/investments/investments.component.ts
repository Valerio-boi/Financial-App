import { Component } from '@angular/core';
import { EtfChartComponent } from '../../components/chart-expenses/etf-chart/etf-chart.component';

@Component({
  selector: 'app-investments',
  imports: [EtfChartComponent],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.css',
})
export class InvestmentsComponent {}

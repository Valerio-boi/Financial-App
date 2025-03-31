import { Component, OnInit } from '@angular/core';
import { EtfChartComponent } from '../../components/etf-chart/etf-chart.component';
import { FinancialDataService } from '../../services/financial-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { tap } from 'rxjs';
import { DynamicChartComponent } from '../../components/dynamic-chart/dynamic-chart.component';

@Component({
  selector: 'app-investments',
  imports: [
    EtfChartComponent,
    CommonModule,
    FormsModule,
    DynamicChartComponent,
  ],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.css',
})
export class InvestmentsComponent implements OnInit {
  public investmentChart: any;
  public selectedAsset: string = 'SPY';
  public investmentAmount: number = 1000;
  public investmentPeriod: number = 12;
  private annualReturn: number = 0;

  constructor(private financialDataService: FinancialDataService) {}

  ngOnInit(): void {
    this.loadAssetData();
  }

  getHistoricalData(symbol: string) {
    return this.financialDataService.getHistoricalData(symbol).pipe(
      tap((data) => {
        console.log('Dati storici:', data);
      }),
    );
  }

  loadAssetData() {
    this.getHistoricalData(this.selectedAsset).subscribe((data) => {
      if (data && data.values) {
        console.log(data);
        this.annualReturn = this.calculateAnnualReturn(data.values);
        this.updateInvestmentChart();
      }
    });
  }

  simulateInvestment(
    initialAmount: number,
    annualReturn: number,
    periodMonths: number,
  ) {
    const values = [];
    let currentAmount = initialAmount;

    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;

    for (let month = 1; month <= periodMonths; month++) {
      currentAmount *= 1 + monthlyReturn;
      values.push(currentAmount);
    }

    const labels = Array.from(
      { length: periodMonths },
      (_, index) => `Mese ${index + 1}`,
    );

    return { labels, values };
  }

  updateInvestmentChart() {
    const { labels, values } = this.simulateInvestment(
      this.investmentAmount,
      this.annualReturn,
      this.investmentPeriod,
    );

    if (this.investmentChart) {
      this.investmentChart.data.labels = labels;
      this.investmentChart.data.datasets[0].data = values;
      this.investmentChart.update();
      console.log('Grafico aggiornato:', this.investmentChart);
    } else {
      this.createInvestmentChart(labels, values);
    }
  }

  createInvestmentChart(labels: string[], values: number[]) {
    this.investmentChart = new Chart('investmentChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Prospetto di Guadagno (USD)',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Simulazione Investimento (${this.selectedAsset})`,
            font: {
              size: 18,
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Periodo di Investimento',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Valore (USD)',
            },
          },
        },
      },
    });
  }

  onSubmit() {
    this.loadAssetData();
  }

  calculateAnnualReturn(data: any[]): number {
    if (data.length < 2) {
      console.error('Dati insufficienti per calcolare il rendimento.');
      return 0;
    }

    data.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
    );

    let initialPrice = parseFloat(data[0].close);
    let finalPrice = parseFloat(data[data.length - 1].close);

    const timePeriodInYears =
      (new Date(data[data.length - 1].datetime).getTime() -
        new Date(data[0].datetime).getTime()) /
      (1000 * 3600 * 24 * 365);

    const annualReturn =
      Math.pow(finalPrice / initialPrice, 1 / timePeriodInYears) - 1;

    return annualReturn * 100;
  }
}

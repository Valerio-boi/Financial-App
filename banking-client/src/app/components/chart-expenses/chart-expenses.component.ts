import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)
@Component({
  standalone: true,
  selector: 'app-chart-expenses',
  templateUrl: './chart-expenses.component.html',
  styleUrl: './chart-expenses.component.css',
})
export class ChartExpensesComponent  implements OnInit{
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions']) {
      this.updateChart();
    }
  }

  public barChart: any;

  @Input() transactions: any[] = [];


  aggregateData() {
    const categorySums: Record<string, number> = {}; 

    this.transactions.forEach((transaction) => {
      const categoria = transaction.categoria;
      if (categorySums[categoria]) {
        categorySums[categoria] += transaction.amount;
      } else {
        categorySums[categoria] = transaction.amount;
      }
    });

    return Object.keys(categorySums).map((category) => ({
      category,
      sum: categorySums[category],
    }));
  }

  createChart() {
    const aggregatedData = this.aggregateData();

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: aggregatedData.map((data) => data.category), 
        datasets: [
          {
            label: 'Spese per Categoria',
            data: aggregatedData.map((data) => data.sum), 
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateChart() {
    if (this.barChart) {
      const aggregatedData = this.aggregateData();
      this.barChart.data.labels = aggregatedData.map((data) => data.category);
      this.barChart.data.datasets[0].data = aggregatedData.map((data) => data.sum);
      this.barChart.update();
    } else {
      this.createChart();
    }
  }


}

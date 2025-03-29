import { Component, Input, OnInit } from '@angular/core';
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

  public barChart: any;

  @Input() transactions: any[] = [];


  aggregateData() {
    const categorySums: Record<string, number> = {}; // Specifica il tipo dell'oggetto

    // Riduci le transazioni per sommare gli importi per categoria
    this.transactions.forEach((transaction) => {
      const categoria = transaction.categoria;
      if (categorySums[categoria]) {
        categorySums[categoria] += transaction.amount;
      } else {
        categorySums[categoria] = transaction.amount;
      }
    });

    // Restituisci un array con le categorie e le somme degli importi
    return Object.keys(categorySums).map((category) => ({
      category,
      sum: categorySums[category],
    }));
  }

  createChart() {
    const aggregatedData = this.aggregateData();

    // Creazione del grafico con i dati aggregati per categoria
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: aggregatedData.map((data) => data.category), // Etichette (categorie)
        datasets: [
          {
            label: 'Spese per Categoria',
            data: aggregatedData.map((data) => data.sum), // Somma degli importi per categoria
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

}

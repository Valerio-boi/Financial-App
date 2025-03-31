import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-chart-expenses',
  templateUrl: './chart-expenses.component.html',
  styleUrl: './chart-expenses.component.css',
})
export class ChartExpensesComponent implements OnInit, OnDestroy {
  public barChart: Chart | undefined; // Memorizza l'istanza del grafico

  @Input() transactions: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions']) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    // Distrugge il grafico quando il componente viene rimosso
    if (this.barChart) {
      this.barChart.destroy();
    }
  }

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
    // 🔥 Se esiste già un grafico, distruggilo prima di crearne uno nuovo
    if (this.barChart) {
      this.barChart.destroy();
    }

    const aggregatedData = this.aggregateData();
    const ctx = document.getElementById('barChart') as HTMLCanvasElement; // Assicura che il canvas sia corretto

    if (!ctx) {
      console.error('Elemento canvas non trovato');
      return;
    }

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: aggregatedData.map((data) => data.category),
        datasets: [
          {
            label: 'Spese per Categoria',
            data: aggregatedData.map((data) => data.sum),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(113, 241, 192, 0.2)',
              'rgba(235, 186, 73, 0.2)',
              'rgba(220, 80, 238, 0.2)',
              'rgba(54, 235, 78, 0.2)',
              'rgba(255, 207, 102, 0.2)',
              'rgba(14, 82, 219, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(64, 214, 139)',
              'rgb(247, 173, 2)',
              'rgb(219, 78, 238)',
              'rgb(54, 235, 93)',
              'rgb(255, 207, 102)',
              'rgb(20, 89, 226)',
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
      this.barChart.data.datasets[0].data = aggregatedData.map(
        (data) => data.sum,
      );
      this.barChart.update();
    } else {
      this.createChart();
    }
  }
}

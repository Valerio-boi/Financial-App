import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-chart-loans',
  imports: [],
  templateUrl: './chart-loans.component.html',
  styleUrl: './chart-loans.component.css'
})
export class ChartLoansComponent {
  @Input() activeLoan: any = {}; // Riceve l'oggetto del finanziamento

  public barChart: any;

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeLoan']) {
      this.updateChart();
    }
  }

  createChart() {
    const months = Array.from({ length: this.activeLoan.totRate }, (_, i) => `Mese ${i + 1}`);
    const ratePagate = Array.from({ length: this.activeLoan.totRate }, (_, i) => i < this.activeLoan.ratePagate ? this.activeLoan.costoMensile : 0);
    const rateRimanenti = Array.from({ length: this.activeLoan.totRate }, (_, i) => i >= this.activeLoan.ratePagate ? this.activeLoan.costoMensile : 0);
    const capitaleResiduo = Array.from({ length: this.activeLoan.totRate }, (_, i) => {
      return Math.max(0, this.activeLoan.capitale - (this.activeLoan.costoMensile * (i + 1)));
    });

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: months, // Mesi
        datasets: [
          {
            label: 'Rate Pagate',
            data: ratePagate, // Rate pagate
            backgroundColor: 'rgba(75, 192, 192, 0.75)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
          {
            label: 'Rate Rimanenti',
            data: rateRimanenti, // Rate rimanenti
            backgroundColor: 'rgba(255, 99, 133, 0.66)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
          {
            label: 'Capitale Residuo',
            data: capitaleResiduo, // Capitale residuo
            backgroundColor: 'rgba(54, 163, 235, 0.75)',
            borderColor: 'rgb(54, 162, 235)',
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
      const months = Array.from({ length: this.activeLoan.totRate }, (_, i) => `Mese ${i + 1}`);
      const ratePagate = Array.from({ length: this.activeLoan.totRate }, (_, i) => i < this.activeLoan.ratePagate ? this.activeLoan.costoMensile : 0);
      const rateRimanenti = Array.from({ length: this.activeLoan.totRate }, (_, i) => i >= this.activeLoan.ratePagate ? this.activeLoan.costoMensile : 0);
      const capitaleResiduo = Array.from({ length: this.activeLoan.totRate }, (_, i) => {
        return Math.max(0, this.activeLoan.capitale - (this.activeLoan.costoMensile * (i + 1)));
      });

      // Aggiorna i dati nel grafico
      this.barChart.data.labels = months;
      this.barChart.data.datasets[0].data = ratePagate;
      this.barChart.data.datasets[1].data = rateRimanenti;
      this.barChart.data.datasets[2].data = capitaleResiduo;
      this.barChart.update();
    } else {
      this.createChart();
    }
  }
}

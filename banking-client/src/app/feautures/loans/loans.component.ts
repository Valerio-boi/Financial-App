import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoansService } from '../../services/loans.service';
import { UserService } from '../../services/user.service';
import { ChartLoansComponent } from "../../components/chart-loans/chart-loans.component";
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-loans',
  imports: [CommonModule, FormsModule, ChartLoansComponent],
  standalone: true,
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent implements OnInit {

  @ViewChild(ChartLoansComponent) chartComponent!: ChartLoansComponent;

  currency: string = 'EUR';
  amount: number = 20000;
  period: number = 12;
  hasActiveLoan: boolean = false;
  activeLoan: any = null;
  public tableData: any[] = [];

  riskLevels = [
    { from: 0.02, to: 0.04 },
    { from: 0.04, to: 0.06 },
    { from: 0.06, to: 0.07 },
    { from: 0.07, to: 0.085 },
    { from: 0.085, to: 0.095 },
    { from: 0.095, to: 0.115 }
  ];
  risk: { from: number, to: number } = this.riskLevels[0];
  @Input() cardType: string = 'Carta'; 

  constructor(private loanService: LoansService, 
              private userService: UserService,
              private cdRef: ChangeDetectorRef,
              private transactionService: TransactionService) {}

  ngOnInit() {
    this.checkUserLoan();
    this.calculateLoan();
  }

  getSelectedCard() {
    const selectedCardType = this.cardType;
    return this.userService.getUser().cards.find((card: any) => card.type === selectedCardType);
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
    this.updateStyle(event.target);
    this.calculateLoan();
  }

  setPeriod(event: any) {
    this.period = parseInt(event.target.value);
    this.updateStyle(event.target);
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
    this.total = `${this.currency} ${this.formatter(A1)}`;
  }

  updateStyle(element: HTMLInputElement) {
    const percentage = (100 * (parseInt(element.value) - parseInt(element.min))) / (parseInt(element.max) - parseInt(element.min));
    const bg = `linear-gradient(90deg, #3AABB9 ${percentage}%, #CBCBCB ${percentage + 0.1}%)`;
    element.style.background = bg;
  }

  checkUserLoan() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          if (user) {
            if (user.finanziamenti) {
              this.hasActiveLoan = true;
              this.loanService.getLoansById(user.finanziamenti).subscribe({
                next: (loanData) => {
                  this.activeLoan = loanData;
                  this.generateTableData();
                  this.cdRef.detectChanges();
                },
                error: (error) => console.error('Errore nel recupero finanziamento', error)
              });
            } else {
              this.hasActiveLoan = false;
            }
          } else {
            console.error('User not found');
            this.hasActiveLoan = false;
          }
        },
        error: (err) => {
          console.error('Errore nel recupero del finanziamento', err);
          this.hasActiveLoan = false;
        }
      });
    }
  }
  

  generateTableData() {
    const totRate = this.activeLoan.totRate; // Numero totale di rate
    const ratePagate = this.activeLoan.ratePagate; // Rate già pagate
    const capitale = this.activeLoan.capitale; 
    const costoMensile = this.activeLoan.costoMensile; 
  
    this.tableData = Array.from({ length: totRate - ratePagate }, (_, i) => {
      const mese = ratePagate + i + 1; // Parto dalla prima rata non pagata
      const residuo = Math.max(0, capitale - costoMensile * mese);
  
      return {
        mese: `Mese ${mese}`,
        importo: costoMensile,
        residuo: residuo,
      };
    });
  }
  


  insertLoan() {
    const selectedCard = this.getSelectedCard();

    if (!selectedCard) {
      console.error('Carta non trovata!');
      return;
    }

    const id = localStorage.getItem('user_id');
    const loanData = {
      capitale: this.amount,
      totRate: this.period,
      ratePagate: 0,
      costoMensile: parseFloat(this.total.replace(/\D/g, '')),
      userId: id,
      cardId: selectedCard.id
      
    };

    this.loanService.insertLoan(loanData).subscribe({
      next: (response) => {
        alert('Finanziamento richiesto con successo!');
      },
      error: (err) => {
        alert('Errore durante l’inserimento del finanziamento.');
        console.error(err);
      }
    });
  }


  pagaRata() {
    const userId = localStorage.getItem('user_id');
  
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          if (user && user.finanziamenti) {
            const selectedCard = user.cards.find((card: { finanziamenti: { id: any; }; }) => card.finanziamenti && card.finanziamenti.id === user.finanziamenti);
            
            if (!selectedCard) {
              console.error('Nessuna carta associata al finanziamento trovata.');
              return;
            }
  
            this.loanService.payRataById(user.finanziamenti).subscribe({
              next: (data) => {
                console.log('Rata pagata con successo', data);
  
                // Recupera il finanziamento aggiornato
                this.loanService.getLoansById(user.finanziamenti).subscribe({
                  next: (updatedLoan) => {
                    this.activeLoan = updatedLoan;
                    
                    this.generateTableData();  // Rigenera i dati della tabella
                    this.chartComponent.updateChart();  // Aggiorna il grafico
                    this.checkUserLoan();
                    this.cdRef.detectChanges();  // Forza l'aggiornamento della UI
                  },
                  error: (err) => console.error('Errore aggiornamento finanziamento', err)
                });
  
                // Inserisce la transazione
                const transactionData = {
                  amount: this.activeLoan.costoMensile,
                  description: 'Rata finanziamento',
                  timestamp: new Date().toISOString(),
                  categoria: 'Finanziamenti',
                  card: { id: selectedCard.id }
                };
  
                this.transactionService.insertTransaction(transactionData).subscribe({
                  next: (response) => {
                    console.log('Transazione inserita con successo', response);
                  },
                  error: (error) => {
                    console.error('Errore durante l\'inserimento della transazione', error);
                  }
                });
              },
              error: (error) => console.error('Errore nel pagamento della rata', error)
            });
          }
        },
        error: (err) => console.error('Errore nel recupero del finanziamento', err)
      });
    }
  }
  
  
  

  total: string = '';

}

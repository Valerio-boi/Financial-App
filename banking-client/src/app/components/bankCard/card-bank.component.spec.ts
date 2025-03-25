import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBankComponent } from './card-bank.component';

describe('CardBankComponent', () => {
  let component: CardBankComponent;
  let fixture: ComponentFixture<CardBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBankComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

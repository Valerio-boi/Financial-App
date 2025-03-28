import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTransactionComponent } from './button-transaction.component';

describe('ButtonTransactionComponent', () => {
  let component: ButtonTransactionComponent;
  let fixture: ComponentFixture<ButtonTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTransactionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

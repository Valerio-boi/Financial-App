import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLoansComponent } from './chart-loans.component';

describe('ChartLoansComponent', () => {
  let component: ChartLoansComponent;
  let fixture: ComponentFixture<ChartLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartLoansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

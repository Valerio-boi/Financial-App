import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feautures/auth/login.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guard/auth.guard';
import { DashboardComponent } from './feautures/dashboard/dashboard.component';
import { LoansComponent } from './feautures/loans/loans.component';
import { EducationComponent } from './feautures/education/education.component';
import { InvestmentsComponent } from './feautures/investments/investments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'loans',
        component: LoansComponent,
        canActivate: [authGuard],
      },
      {
        path: 'education',
        component: EducationComponent,
        canActivate: [authGuard],
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

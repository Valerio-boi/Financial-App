import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feautures/auth/login.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: '', component: LayoutComponent,
      children:[

      ]  
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
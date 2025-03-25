import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feautures/auth/login.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guard/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: LayoutComponent,
      children:[
          // {
          //   path: "admin",
          //   canActivate: [authGuard]
          // }
      ]  
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
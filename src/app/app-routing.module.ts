import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MarketComponent } from './market/market.component';

const routes: Routes = [
  {path:'',component: LoginComponent,pathMatch:'full'},
  {path:'register',component: RegisterComponent},
  {path:'forgotPassword',component: ForgotPasswordComponent},
  {path:'home',component:MarketComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

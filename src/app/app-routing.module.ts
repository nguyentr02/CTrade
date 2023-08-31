import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MarketComponent } from './market/market.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import { PersonalInfomationComponent} from './personal-infomation/personal-infomation.component';
import { CoinCardComponent } from './coin-card/coin-card.component';

const routes: Routes = [
  {path:'', component: LoginComponent,pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'market', component: MarketComponent},

  /*nav and head for testing purpose only*/
  {path:'nav', component: NavbarComponent},
  {path:'footer', component: FooterComponent},
  {path:'history', component: HistoryComponent},
  {path:'personal-info', component: PersonalInfomationComponent},
  {path: 'test', component: CoinCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import {Routes} from '@angular/router';
import {CurrencyComponent} from './currency/currency.component';
import {Test2Component} from './test2/test2.component';

export const routes: Routes = [
  {path: '', redirectTo:'component1', pathMatch: 'full'},
  {path: 'component1', component: CurrencyComponent},
  {path: 'component2', component: Test2Component},
];

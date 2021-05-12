import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PmComponent} from './pm/pm.component';
import {HomeTestComponent} from './home-test/home-test.component';

const routes: Routes = [
  // { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent},
  { path: 'search', component: SearchComponent},
  { path: 'results/:id', component: ResultsComponent},
  { path: 'results', component: ResultsComponent},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SearchComponent, ResultsComponent];


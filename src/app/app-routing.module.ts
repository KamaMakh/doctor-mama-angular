import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './helpers/auth-guard.service';
import {LoginComponent} from './views/login/login.component';
import {HomeComponent} from './views/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

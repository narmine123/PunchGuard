import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ListeEmployeComponent } from './liste-employe/liste-employe.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';

 export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  {path: 'listeEmploye', component: ListeEmployeComponent},
  { path: 'modifier/:id', component: ModifierEmployeComponent },

  { path: '**', redirectTo: '' }
];
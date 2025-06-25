import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ListeEmployeComponent } from './liste-employe/liste-employe.component';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { AffichageComponent } from './affichage/affichage.component';
import { CongesComponent } from './conges/conges.component';
import { CongesDemandeComponent } from './conges-demande/conges-demande.component';
import { CongesListeComponent } from './conges-liste/conges-liste.component';

 export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  {path: 'listeEmploye', component: ListeEmployeComponent},
  { path: 'modifier/:id', component: ModifierEmployeComponent },
  { path: 'pointages/:id', component: AffichageComponent },

  { path: 'conges/:id', component: CongesComponent },
  { path: 'demandeConges', component: CongesDemandeComponent },
  { path: 'listeConges/:id', component: CongesListeComponent },




  { path: '**', redirectTo: '' }
];
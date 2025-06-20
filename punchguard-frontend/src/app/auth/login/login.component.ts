import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  /*onLogin() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password 
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('auth_token', response.token);
          this.router.navigate(['/listeEmploye']);
        },
        error: (err) => {
          console.error('Erreur de connexion:', err);
          alert('Email ou mot de passe incorrect');
        }
      });
    }
  }*/
 
 
 
    errorMessage: string = '';
onLogin() {
  if (!this.loginForm.valid) {
    this.errorMessage = 'Formulaire invalide';
    return;
  }

  const email = this.loginForm.get('email')?.value;
  const password = this.loginForm.get('password')?.value;

  if (!email || !password) {
    this.errorMessage = 'Email et mot de passe requis';
    return;
  }

  const credentials = {
    email: email.trim(), // Nettoyage des espaces
    password: password
  };

  console.log('Données envoyées:', credentials);

  this.authService.login(credentials).subscribe({
    next: (res) => {
      console.log('La connexion est établie avec succés ');    
      alert('La connexion est établie ');
      localStorage.setItem('token', res.token); 
      this.router.navigate(['/listeEmploye']);
    },
    error: (err) => {
      console.error('Détails de l\'erreur:', err);
      this.errorMessage = err.error?.message || 'Erreur de connexion';
    }
  });
}}

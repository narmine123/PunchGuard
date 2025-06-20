import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = this.fb.group({
  nom: ['', Validators.required],
  prenom: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  poste: ['', Validators.required],
  mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  
  onSignUp() {
  if (this.signupForm.valid) {
    this.authService.signUp(this.signupForm.value).subscribe(
      () => {
        console.log('Votre inscription est effectuée');
        alert('Compte créé avec succès !');
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.error('Erreur lors de l’inscription :', err);
        alert('Erreur : ' + err.message);
      }
    );
  }
}


}

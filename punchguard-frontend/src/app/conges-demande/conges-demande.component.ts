import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CongesService } from '../services/conges.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-conges-demande',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './conges-demande.component.html',
  styleUrl: './conges-demande.component.css'
})
export class CongesDemandeComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private congeService: CongesService,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    this.form = this.fb.group({
      employeId:this.authService.getEmployeId(),
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  /*onSubmit() {
    if (this.form.valid) {
      this.congeService.ajouterConge(this.form.value).subscribe({
        next: () => alert('Demande envoyée!'),
        error: () => alert('Erreur')
      });
    }
  }*/

  onSubmit(){
    const employeId = this.authService.getEmployeId();

    if (!employeId) {
      alert("Erreur : employeId non trouvé. Veuillez vous reconnecter.");
      return;
    }

    this.form.patchValue({ employeId }); // injecte dans le formulaire

    this.congeService.ajouterConge(this.form.value).subscribe({
      next: () => alert("Demande de congé envoyée avec succès !"),
      error: () => alert("Erreur lors de l’envoi.")
    });

  }
}
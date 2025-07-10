import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CongesService } from '../services/conges.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-conges-demande',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './conges-demande.component.html',
  styleUrl: './conges-demande.component.css'
})
export class CongesDemandeComponent {
  form: FormGroup;
    employeId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private congeService: CongesService,
    private route: ActivatedRoute,
    private authService:AuthService,
    public router:Router
  ) {
    this.form = this.fb.group({
      employeId: null,
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.employeId = this.authService.getEmployeId();
    if (this.employeId) {
      this.form.patchValue({ employeId: this.employeId });
    }
  }

  onSubmit(){

    if (!this.employeId) {
      alert("Erreur : employeId non trouvé. Veuillez vous reconnecter.");
      return;
    }

    this.form.patchValue({ employeId: this.employeId }); // injecte dans le formulaire

    this.congeService.ajouterConge(this.form.value).subscribe({
      next: () => alert("Demande de congé envoyée avec succès !"),
      error: () => alert("Erreur lors de l’envoi.")
    });

  }




}
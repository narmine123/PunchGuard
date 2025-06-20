import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employe } from '../models/employe.models';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-liste-employe',
  standalone: true,
  imports: [HttpClientModule,   CommonModule ,RouterLink],
  templateUrl: './liste-employe.component.html',
  styleUrl: './liste-employe.component.css'
})
export class ListeEmployeComponent implements OnInit {


  employes: Employe[] = [];

  constructor(private employeService: EmployeeService, public router: Router) {}


 
  ngOnInit(): void {
  this.employeService.getEmployes().subscribe({
    next: (data) => {
      this.employes = data;
      console.log('Employés récupérés:', data); 
    },
    error: (err) => console.error('Erreur chargement employés', err)
  });
}

  selectedEmploye?: Employe;

  selectEmploye(employe: Employe){
    this.selectedEmploye = employe;
    console.log('Employé sélectionné:' , employe);

  }


  deleteEmploye(id: number): void {
      this.employeService.deleteEmployes(id).subscribe({
        next: () => {
          this.employes = this.employes.filter(e => e.id !== id);
          alert('Employé supprimé avec succès');
          console.log('Employé supprimé avec succès');

        },
        error: (err) => console.error('Erreur suppression', err)
      });
    }
  }
  
 


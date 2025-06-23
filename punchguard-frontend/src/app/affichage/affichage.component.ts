import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Pointage } from '../models/pointage.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-affichage',
  standalone: true,
  imports: [HttpClientModule, CommonModule ],
  templateUrl: './affichage.component.html',
  styleUrl: './affichage.component.css'
})
export class AffichageComponent implements OnInit{
   pointages: Pointage[] = [];

  
   constructor(private http: HttpClient, private employService: EmployeeService,   private route: ActivatedRoute,
) {}


ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    console.error('Aucun ID fourni dans l’URL');
    return;
  }

  this.http.get<any[]>(`http://localhost:3000/api/employes/pointages/${id}`)
    .subscribe({
      next: (data) => {
        console.log(' Données reçues :', data);
        this.pointages = data;
      },
      error: (err) => {
        console.error(' Erreur de récupération des pointages :', err);
      }
    });
}


 
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CongesService } from '../services/conges.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-conges-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conges-liste.component.html',
  styleUrls: ['./conges-liste.component.css']
})
export class CongesListeComponent implements OnInit {
  conges: any[] = [];

  constructor(private authService: AuthService, private congeService: CongesService, private route: ActivatedRoute,) {}

 ngOnInit(): void {
 /* const employeId = this.authService.getEmployeId();
  console.log('Employé connecté, ID:', employeId); // <--- log de vérification
*/
    const employeId = Number(this.route.snapshot.paramMap.get('id'));

  if (employeId) {
    this.congeService.getCongesByEmployeId(employeId).subscribe({
      next: (data) => {
        console.log('Congés récupérés :', data); // <--- log pour vérifier les données
        this.conges = data;
      },
      error: (err) => {
        console.error('Erreur récupération des congés', err);
      }
    });
  } else {
    console.warn('Aucun token trouvé ou ID invalide');
  }
}

}

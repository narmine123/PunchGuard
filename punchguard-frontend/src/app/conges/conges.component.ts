import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employe } from '../models/employe.models';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-conges',
  standalone: true,
  imports: [HttpClientModule ,RouterLink],
  templateUrl: './conges.component.html',
  styleUrl: './conges.component.css'
})
export class CongesComponent {
  employes: Employe[] = [];

  constructor(public router:Router){}

 goToListeConges() {
  this.router.navigate(["/congesListe"]);
}



}

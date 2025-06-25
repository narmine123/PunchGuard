import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employe } from '../models/employe.models';


@Component({
  selector: 'app-conges',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './conges.component.html',
  styleUrl: './conges.component.css'
})
export class CongesComponent {
  employes: Employe[] = [];

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modifier-employe',
  standalone: true,
    imports: [ ReactiveFormsModule,  RouterLink, HttpClientModule],
  
  templateUrl: './modifier-employe.component.html',
  styleUrl: './modifier-employe.component.css'
})
export class ModifierEmployeComponent implements OnInit{
  employeForm!: FormGroup;
  id!: number;

  constructor(private router: Router, private employeService: EmployeeService, private fb: FormBuilder,   private route: ActivatedRoute){}
  ngOnInit(): void {
      this.id = Number(this.route.snapshot.paramMap.get('id'));//Récupération de l'ID depuis l'URL
      //Initialisation du formulaire réactif
      this.employeForm = this.fb.group({
        nom:[''],
        prenom: [''],
        email: [''],
        poste: ['']
      })
      //Chargement des données de l'employé
      this.employeService.getEmployeById(this.id).subscribe({
        next: (emp)=> this.employeForm.patchValue(emp),//patchValue(emp) : Met à jour le formulaire avec les valeurs de l'objet emp reçu
        error: (err) => console.error('Erreur chargement employé', err)
      });

  }
  
  onSubmit():void{
    if (this.employeForm.valid){
      this.employeService.updateEmployes(this.id,this.employeForm.value).subscribe({
        next:()=>{
          alert('Employé modifié avec succès');
         this.router.navigate(['/listeEmploye']);
        },
        error: (err) => console.error('Erreur mise à jour ', err)});
    }
  }


}

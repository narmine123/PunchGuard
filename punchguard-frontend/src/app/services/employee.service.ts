import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   private apiUrl = 'http://localhost:3000/api/employes';

  constructor(private http: HttpClient) {}

  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/ListeEmploye`);
  }

   deleteEmployes(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteEmploye/${id}`);
  }

  updateEmployes(id:number , employe:Partial<Employe>): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateEmploye/${id}`,employe);
  }


  getEmployeById(id:number):Observable<Employe>{
    return this.http.get<Employe>(`${this.apiUrl}/ListeEmploye${id}`)
  }


}

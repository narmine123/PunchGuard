import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conge } from '../models/conge.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  private apiUrl ='http://localhost:3000/api/conges';
  constructor(private http:HttpClient) { }


   getCongesByEmployeId(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/ListeConges/${id}`);
  }
  ajouterConge(conge: Conge):Observable<any>{
    return this.http.post(`${this.apiUrl}/addConges`,conge)
  }

}

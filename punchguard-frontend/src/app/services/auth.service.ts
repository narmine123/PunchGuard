
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/employes';

  constructor(private http: HttpClient) {}

  signUp(userData: any) {
    return this.http.post(`${this.apiUrl}/AddEmploye`, userData);
  }


  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }
}
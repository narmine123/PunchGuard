
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


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


getEmployeId(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
  const decoded: any = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error("Erreur lors du décodage du token :", err);
    return null;
  }
}


}
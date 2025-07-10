import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const email = localStorage.getItem('email');

    if (email === 'admin@gmail.com') {
      return true;
    }

    // Redirige l'employé vers page pointage
    this.router.navigate(['/pointage']);
    return false;
  }
}

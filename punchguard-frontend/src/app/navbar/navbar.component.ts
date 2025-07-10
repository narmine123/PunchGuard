import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; // Importez Router
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

   isLoggedIn = false;
    role: string | null = null;
    email: string | null = null;
    employeId: number | null = null;



  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
      this.email = localStorage.getItem('email');
      this.employeId = this.authService.getEmployeId();
    this.isLoggedIn = this.authService.isAuthenticated();
  }


goToConges() {
  const employeId = this.authService.getEmployeId();
  if (employeId) {
    this.router.navigate(['/conges', employeId]);
  } else {
    // gestion cas token manquant
    console.warn('Employé non identifié');
  }
}

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }


}

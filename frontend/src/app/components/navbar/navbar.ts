import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private authService: AuthService, private router: Router) {}

  get authenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  linksAuth = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' },
  ];

  linksGuest = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

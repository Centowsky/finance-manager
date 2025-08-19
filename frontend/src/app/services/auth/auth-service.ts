import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  apiUrl = 'http://localhost:3000/api';
  token: string | null = null;

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, email, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { username, password });
  }

  isAuthenticated(): boolean {
    return this.loadToken() ? true : false;
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('jwt', token);
  }

  loadToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.token = token;
    }
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}

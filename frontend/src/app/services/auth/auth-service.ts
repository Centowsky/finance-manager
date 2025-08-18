import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post('/api/register', { username, email, password });
  }

  isAuthenticated(): boolean {
    return true;
  }

  logout(): void {
    console.log('User logged out');
  }
}

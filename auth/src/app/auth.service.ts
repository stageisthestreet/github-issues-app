import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/local/register`, userData).pipe(
      tap((res: any) => {
        localStorage.setItem('jwt', res.jwt);
      })
    );
  }

  login(credentials: { identifier: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/local`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('jwt', res.jwt);
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
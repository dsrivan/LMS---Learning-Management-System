import { Injectable, signal } from '@angular/core';

import { LoginResponse } from '../models/login.model';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  private readonly currentRole = signal<UserRole | null>(this.loadRole());

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  setUser(user: LoginResponse): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentRole.set(user.role);
  }

  getUser(): LoginResponse | null {
    const user = localStorage.getItem(this.userKey);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  getUserId(): number | null {
    return this.getUser()?.userId ?? null;
  }

  getRole(): UserRole | null {
    return this.currentRole();
  }

  hasRole(role: UserRole): boolean {
    return this.currentRole() === role;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentRole.set(null);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  private loadRole(): UserRole | null {
    const user = this.getUser();
    return user?.role ?? null;
  }
}

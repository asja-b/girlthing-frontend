import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://6a0effe01736097c360aff4f.mockapi.io/task-manager/users';

  constructor(private http: HttpClient) {}

  findUserByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}`);
  }

  login(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): IUser | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'Admin' : false;
  }
}
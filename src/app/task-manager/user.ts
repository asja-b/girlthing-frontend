import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import { UserApiService } from './user-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = [];

  constructor(private userApiService: UserApiService) {}

  loadUsers(): void {
    this.userApiService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  getUserById(id: string): Observable<IUser> {
    return this.userApiService.getById(id);
  }

  addUser(user: Partial<IUser>): Observable<IUser> {
    return this.userApiService.create(user);
  }

  updateUser(id: string, user: Partial<IUser>): Observable<IUser> {
    return this.userApiService.update(id, user);
  }

  deleteUser(id: string): void {
    this.userApiService.delete(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }
}
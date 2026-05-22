import { Injectable } from '@angular/core';
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

  deleteUser(id: string): void {
    this.userApiService.delete(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }
}
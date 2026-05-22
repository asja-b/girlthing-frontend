import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable implements OnInit {

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.loadUsers();
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id);
  }
}
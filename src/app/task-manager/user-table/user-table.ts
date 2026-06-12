import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { UserService } from '../user';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, ConfirmDialog],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable implements OnInit {

  showDialog = false;
  userToDelete: string | null = null;

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.loadUsers();
  }

  onAddNew() {
    this.router.navigate(['/admin/users/new']);
  }

  onEdit(id: string) {
    this.router.navigate(['/admin/users', id, 'edit']);
  }

  openDeleteDialog(id: string) {
    this.userToDelete = id;
    this.showDialog = true;
  }

  confirmDelete() {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete);
    }
    this.showDialog = false;
    this.userToDelete = null;
  }

  cancelDelete() {
    this.showDialog = false;
    this.userToDelete = null;
  }
}
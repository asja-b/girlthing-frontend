import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StatusBadge } from '../status-badge/status-badge';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { TaskService } from '../task';
import { UserService } from '../user';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, StatusBadge, ConfirmDialog],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTable implements OnInit {

  showDialog = false;
  taskToDelete: string | null = null;

  constructor(
    public taskService: TaskService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.loadTasks();
    this.userService.loadUsers();
  }

  getUserName(userId: string): string {
    const user = this.userService.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }

  onAddNew() {
    this.router.navigate(['/admin/tasks/new']);
  }

  onEdit(id: string) {
    this.router.navigate(['/admin/tasks', id, 'edit']);
  }

  openDeleteDialog(id: string) {
    this.taskToDelete = id;
    this.showDialog = true;
  }

  confirmDelete() {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete);
    }
    this.showDialog = false;
    this.taskToDelete = null;
  }

  cancelDelete() {
    this.showDialog = false;
    this.taskToDelete = null;
  }
}
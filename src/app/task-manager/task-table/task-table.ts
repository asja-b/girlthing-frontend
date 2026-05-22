import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadge } from '../status-badge/status-badge';
import { TaskService } from '../task';
import { UserService } from '../user';
import { ITask } from '../task.interface';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, StatusBadge],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTable implements OnInit {

  constructor(
    public taskService: TaskService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.taskService.loadTasks();
    this.userService.loadUsers();
  }

  getUserName(userId: string): string {
    const user = this.userService.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }

  onDeleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
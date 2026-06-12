import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { TaskService } from '../task';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  currentUser: IUser | null = null;

  constructor(
    private authService: AuthService,
    public taskService: TaskService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.taskService.loadTasks();
  }
  
  countByStatus(status: string): number {
    if (!this.currentUser) return 0;
    return this.taskService.tasks.filter(
      t => t.assignedTo === this.currentUser!.id && t.status === status
    ).length;
  }
}
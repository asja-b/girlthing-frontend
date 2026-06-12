import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../task';
import { AuthService } from '../auth';
import { ITask } from '../task.interface';

@Component({
  selector: 'app-task-card-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCard],
  templateUrl: './task-card-list.html',
  styleUrl: './task-card-list.scss'
})
export class TaskCardList implements OnInit {

  searchText = '';
  selectedStatus = '';

  constructor(
    public taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.taskService.loadTasks();
  }

  get filteredTasks(): ITask[] {
    const currentUser = this.authService.getCurrentUser();

    return this.taskService.tasks.filter(task => {
      const isMyTask = currentUser ? task.assignedTo === currentUser.id : false;
      const matchesSearch = task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus === '' || task.status === this.selectedStatus;
      return isMyTask && matchesSearch && matchesStatus;
    });
  }

  onStatusChanged(event: { taskId: string, newStatus: string }) {
    this.taskService.updateTaskStatus(event.taskId, event.newStatus);
  }
}
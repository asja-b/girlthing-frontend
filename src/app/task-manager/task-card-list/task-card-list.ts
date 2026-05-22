import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../task';
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

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.taskService.loadTasks();
  }

  get filteredTasks(): ITask[] {
    return this.taskService.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus === '' || task.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onStatusChanged(event: { taskId: string, newStatus: string }) {
    this.taskService.updateTaskStatus(event.taskId, event.newStatus);
  }
}
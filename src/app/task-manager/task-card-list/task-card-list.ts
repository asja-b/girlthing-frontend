import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCard } from '../task-card/task-card';

interface ITask {
  id: string;
  title: string;
  projectName: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-task-card-list',
  imports: [CommonModule, FormsModule, TaskCard],
  templateUrl: './task-card-list.html',
  styleUrl: './task-card-list.scss'
})
export class TaskCardList {

  searchText = '';
  selectedStatus = '';

tasks: ITask[] = [
  { id: '1', title: 'Finish Angular assignment', projectName: 'She.Dev Course', assignedTo: 'user1', status: 'In Progress', dueDate: '2025-05-10' },
  { id: '2', title: 'Study for Business Intelligence exam', projectName: 'University', assignedTo: 'user1', status: 'To Do', dueDate: '2025-05-15' },
  { id: '3', title: 'Gym - leg day', projectName: 'Health', assignedTo: 'user1', status: 'Done', dueDate: '2025-04-24' },
  { id: '4', title: 'Reorganise wardrobe', projectName: 'Personal', assignedTo: 'user1', status: 'To Do', dueDate: '2025-05-02' },
  { id: '5', title: 'Read 30 pages', projectName: 'Personal', assignedTo: 'user1', status: 'In Progress', dueDate: '2025-04-28' },
  { id: '6', title: 'Evening skincare routine', projectName: 'Health', assignedTo: 'user1', status: 'Done', dueDate: '2025-04-24' },
];

  get filteredTasks(): ITask[] {
    return this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus === '' || task.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onStatusChanged(event: { taskId: string, newStatus: string }) {
    const task = this.tasks.find(t => t.id === event.taskId);
    if (task) {
      task.status = event.newStatus;
    }
  }
}
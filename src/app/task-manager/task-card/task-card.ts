import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusBadge } from '../status-badge/status-badge';

interface ITask {
  id: string;
  title: string;
  projectName: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadge],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {
  @Input() task!: ITask;
  @Output() statusChanged = new EventEmitter<{ taskId: string, newStatus: string }>();

  onSelectChange(newStatus: string) {
    this.statusChanged.emit({ taskId: this.task.id, newStatus });
  }
}
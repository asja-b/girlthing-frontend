import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from './task.interface';
import { TaskApiService } from './task-api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: ITask[] = [];

  constructor(private taskApiService: TaskApiService) {}

  loadTasks(): void {
    this.taskApiService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  getTaskById(id: string): Observable<ITask> {
    return this.taskApiService.getById(id);
  }

  addTask(task: Partial<ITask>): Observable<ITask> {
    return this.taskApiService.create(task);
  }

  updateTask(id: string, task: Partial<ITask>): Observable<ITask> {
    return this.taskApiService.update(id, task);
  }

  updateTaskStatus(id: string, newStatus: string): void {
    this.taskApiService.update(id, { status: newStatus }).subscribe(updatedTask => {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.status = updatedTask.status;
      }
    });
  }

  deleteTask(id: string): void {
    this.taskApiService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}
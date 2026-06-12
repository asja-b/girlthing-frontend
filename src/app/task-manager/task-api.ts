import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private apiUrl = 'https://6a0effe01736097c360aff4f.mockapi.io/task-manager/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  getById(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/${id}`);
  }

  create(task: Partial<ITask>): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  update(id: string, task: Partial<ITask>): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${id}`, task);
  }

  delete(id: string): Observable<ITask> {
    return this.http.delete<ITask>(`${this.apiUrl}/${id}`);
  }
}
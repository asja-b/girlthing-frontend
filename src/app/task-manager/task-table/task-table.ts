import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadge } from '../status-badge/status-badge';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

interface ITask {
  id: string;
  title: string;
  projectName: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}
/*ITask i IUser interfejsi se ponavljaju u više komponenti.
 Idealno bi bilo premjestiti ih u zajednički fajl i koristiti servis,
 ali čekam da to obradimo na radionici prije nego što refaktoriram.*/
@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, StatusBadge],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTable {

  users: IUser[] = [
    { id: '1', name: 'Asja Brčaninović', email: 'asja@gmail.com', role: 'Admin', password: 'asja123' },
    { id: '2', name: 'Irena Šabić', email: 'irena@gmail.com', role: 'Regular user', password: 'irena123' },
    { id: '3', name: 'Edina Aljić', email: 'edima@gmail.com', role: 'Regular user', password: 'edina123' },
    { id: '4', name: 'Hedija Šišić', email: 'hedija@gmail.com', role: 'Regular user', password: 'hedija123' },
  ];

tasks: ITask[] = [
  { id: '1', title: 'Finish Angular assignment', projectName: 'She.Dev Course', assignedTo: '1', status: 'In Progress', dueDate: '2025-05-10' },
  { id: '2', title: 'Study for Business Intelligence exam', projectName: 'University', assignedTo: '2', status: 'To Do', dueDate: '2025-05-15' },
  { id: '3', title: 'Gym - leg day', projectName: 'Health', assignedTo: '3', status: 'Done', dueDate: '2025-04-24' },
  { id: '4', title: 'Reorganise wardrobe', projectName: 'Personal', assignedTo: '4', status: 'To Do', dueDate: '2025-05-02' },
  { id: '5', title: 'Read 30 pages', projectName: 'Personal', assignedTo: '2', status: 'In Progress', dueDate: '2025-04-28' },
  { id: '6', title: 'Evening skincare routine', projectName: 'Health', assignedTo: '3', status: 'Done', dueDate: '2025-04-24' },
];

  getUserName(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }
}
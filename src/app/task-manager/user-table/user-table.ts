import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable {
  users: IUser[] = [
    { id: '1', name: 'Asja Brčaninović', email: 'asja@gmail.com', role: 'Admin', password: 'asja123' },
    { id: '2', name: 'Irena Šabić', email: 'irena@gmail.com', role: 'Regular user', password: 'irena123' },
    { id: '3', name: 'Edina Aljić', email: 'edima@gmail.com', role: 'Regular user', password: 'edina123' },
    { id: '4', name: 'Hedija Šišić', email: 'hedija@gmail.com', role: 'Regular user', password: 'hedija123' },
  ];
}
import { Component } from '@angular/core';
import { QuoteGenerator } from './quote-generator/quote-generator';
import { TaskCardList } from './task-manager/task-card-list/task-card-list';
import { UserTable } from './task-manager/user-table/user-table';
import { TaskTable } from './task-manager/task-table/task-table';

@Component({
  selector: 'app-root',
  imports: [QuoteGenerator, TaskCardList,UserTable, TaskTable],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 
}

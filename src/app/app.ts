import { Component } from '@angular/core';
import { QuoteGenerator } from './quote-generator/quote-generator';
import { TaskCardList } from './task-manager/task-card-list/task-card-list';

@Component({
  selector: 'app-root',
  imports: [QuoteGenerator, TaskCardList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 
}

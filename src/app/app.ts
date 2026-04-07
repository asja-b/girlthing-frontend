import { Component } from '@angular/core';
import { QuoteGenerator } from './quote-generator/quote-generator';

@Component({
  selector: 'app-root',
  imports: [QuoteGenerator],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Quote {
  text: string;
  author: string;
  category: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-quote-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-generator.html',
  styleUrl: './quote-generator.scss',
})


export class QuoteGenerator {

  categories = ['funny', 'love', 'motivational'];
  selectedCategory = 'funny';
  currentQuote: Quote | null = null;
  showStats = true;

  quotes: Quote[] = [
    { text: "It works on my machine", author: "Every Developer Ever", category: "funny", isFavorite: false },
    { text: "Code is like humor. When you have to explain it, it's bad", author: "Cory House", category: "funny", isFavorite: false },
    { text: "A user interface is like a joke. If you have to explain it, it's not that good.", author: "Martin LeBlanc", category: "funny", isFavorite: false },

    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", category: "love", isFavorite: false },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi", category: "love", isFavorite: false },
    { text: "To love and be loved is to feel the sun from both sides", author: "David Viscott", category: "love", isFavorite: false },

    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivational", isFavorite: false },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay", category: "motivational", isFavorite: false },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivational", isFavorite: false },
  ];

  getRandomQuote() {
    const filtered = this.quotes.filter(q => q.category === this.selectedCategory);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    this.currentQuote = filtered[randomIndex];
  }

  getFavoritesCount(category: string): number {
    return this.quotes.filter(q => q.category === category && q.isFavorite).length;
  }
}

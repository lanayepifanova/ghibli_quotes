import './style.css'
import { quotes } from './quotes.js'

class QuoteGenerator {
  constructor() {
    this.quotes = quotes;
    this.currentQuoteIndex = -1;
    this.quoteElement = document.querySelector('#quote');
    this.sourceElement = document.querySelector('#source');
    this.button = document.querySelector('#new-quote');
    
    this.init();
  }

  init() {
    this.generateQuote();
    this.button.addEventListener('click', () => this.generateQuote());
    
    // Spacebar shortcut
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        this.generateQuote();
      }
    });
  }

  generateQuote() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.quotes.length);
    } while (newIndex === this.currentQuoteIndex && this.quotes.length > 1);
    
    this.currentQuoteIndex = newIndex;
    const selectedQuote = this.quotes[this.currentQuoteIndex];

    // Reset animations
    this.quoteElement.style.animation = 'none';
    this.sourceElement.style.animation = 'none';
    
    setTimeout(() => {
      this.quoteElement.textContent = selectedQuote.text;
      this.sourceElement.textContent = selectedQuote.source;
      
      this.quoteElement.style.animation = 'fadeInUp 0.6s ease forwards';
      this.sourceElement.style.animation = 'fadeInUp 0.6s ease 0.2s forwards';
    }, 50);
  }
}

// Initialize the app
new QuoteGenerator();
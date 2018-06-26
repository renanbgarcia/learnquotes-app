import { Component } from '@angular/core';
import { RandomquoteService } from './randomquote.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'LearnQuotes';

  quotes = ''

  constructor(private randomservice: RandomquoteService){}

  getAnotherQuote() {
    this.randomservice.getRes()
  }

  changeLanguage(lang) {
    this.randomservice.changeLanguage(lang)
  }

}


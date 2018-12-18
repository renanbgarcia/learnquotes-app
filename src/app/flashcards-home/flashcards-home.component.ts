import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flashcards-home',
  templateUrl: './flashcards-home.component.html',
  styleUrls: ['./flashcards-home.component.css']
})
export class FlashcardsHomeComponent implements OnInit {

  cardsNumber;
  language;

  constructor() { }

  ngOnInit() {
  }

  getNumber(e) {
    this.cardsNumber = e.target.value;
  }

  getLanguage(e) {
    this.language = e.target.value;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  import { from } from 'rxjs';

@Component({
  selector: 'app-flashcards-home',
  templateUrl: './flashcards-home.component.html',
  styleUrls: ['./flashcards-home.component.css']
})
export class FlashcardsHomeComponent implements OnInit {

  cardsNumber;
  language;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToPlay() {
    this.getNumber();
    this.getLanguage();
    this.router.navigate(['/home/training/flashcards/play'], { queryParams: { sessionQuantity: this.cardsNumber, sessionLanguage: this.language } });
  }

  getNumber() {
    this.cardsNumber = (<HTMLInputElement>document.getElementById("number")).value;
  }

  getLanguage() {
    this.language = (<HTMLInputElement>document.getElementById("language")).value;
  }

}

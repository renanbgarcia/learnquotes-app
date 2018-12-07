import { Component, OnInit } from '@angular/core';
import { Flashcards } from '../games/flashcards/flashcards';
import { GetUserInfo } from './../services/getUserInfo.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  userWords = [];
  flashcards;

  constructor(private getInfo: GetUserInfo) {   }

  ngOnInit() {
    this.setDeck().then(() => console.log(this.flashcards.deck));
  }

  /**
   * Create a shuffled deck with the user words.
   * @author Renan Garcia
   * @return Promise 
   */
  setDeck() {
    const dealer = new Promise((resolve, reject) => {
      this.getInfo.getUserWords().map((wordList) => this.userWords = wordList)
      .map(() => this.flashcards = new Flashcards(this.userWords))
      .map(() => this.flashcards.shuffle())
      .subscribe(() => resolve());
    });
    return dealer
  }

}

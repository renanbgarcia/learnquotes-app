import { Component, OnInit } from '@angular/core';
import { Flashcards } from '../games/flashcards/flashcards'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const flashcards = new Flashcards;
  }

}

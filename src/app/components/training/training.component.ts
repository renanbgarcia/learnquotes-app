import { Component, OnInit } from '@angular/core';
import { GetUserInfo } from './../../services/getUserInfo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';
import { FlashcardsService } from 'src/app/services/flashcards.service';
import { MzModalService } from 'ngx-materialize';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  sessionQuantity;
  sessionLanguage;
  userWords = [];
  flashcards;
  currentCard = { word: '', word_id: '', meaning: '', index: 0, EF: 2.5, nextRevision: '', reviewedTimes: 3 };
  currentCount = 0;
  deck;
  stateEdit;
  doShowMeaning: Boolean = false;
  doShowTranslation: Boolean = false;
  wordTranslation = 'loading';

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private Flashcards: FlashcardsService,
              private router: Router) {   }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionQuantity = params.sessionQuantity;
      this.sessionLanguage = params.sessionLanguage;
      this.Flashcards.setCardsLanguage(params.sessionLanguage);
    });
    console.log(this.Flashcards.language);
    this.Flashcards.getCards(this.sessionQuantity)
    .subscribe((deck) => {
      this.deck = deck;
      console.log(this.deck);
      this.currentCard.word = this.deck[0].word;
      console.log(this.deck[0]);
      this.currentCard.index = 0;
      this.currentCard.meaning = this.deck[0].meaning;
      this.currentCard.word_id = this.deck[0]._id;
      this.currentCard.reviewedTimes = this.deck[0].reviewedTimes;
    });
  }

  /**
   * Select the next deck card. If the it's already the last card, returns false.
   * @author Renan Garcia
   * @return boolean
   */
  nextCard() {
    const deckLength = this.deck.length;
    const index = this.currentCard.index + 1;
    console.log(deckLength);
    if (index < deckLength && (this.currentCount < this.sessionQuantity -1)) {
      console.log(this.deck[index]._id);
      this.currentCard.word = this.deck[index].word;
      this.currentCard.index = index;
      this.currentCard.word_id = this.deck[index]._id;
      this.currentCard.meaning = this.deck[index].meaning;
      this.currentCount++;
      this.hideMeaning();
      this.hideTranslation();
    } else if ((deckLength < this.sessionQuantity) && (this.currentCount < this.sessionQuantity - 1)){
      this.currentCard.index = 0;
      this.nextCard();
    } else {
      this.router.navigate(['home/training/flashcards/start']);
    }
  }

  chooseWordState(state) {
    const newEF = this.calculateNewEF(state);
    const nRev = this.calculateNextRevision();
    this.updateWordState(state, newEF, nRev);
    this.nextCard();
  }

  updateWordState(state, newEF, nRev) {
    console.log(this.currentCard.word_id);
    this.http.post(`${environment.ENDPOINT}/api/update/word`,  { word_id: this.currentCard.word_id, state: state, newEF: newEF, nRev: nRev }).subscribe((res) => { console.log(res); res});
  }

  getWordTranslation() {
    this.http.post(`${environment.ENDPOINT}/api/translate`, { word: this.currentCard.word }).subscribe((res: {transl: string}) => {console.log(res.transl);this.wordTranslation = res.transl});
  }

  showMeaning() {
    this.doShowMeaning = true;
  }

  hideMeaning() {
    this.doShowMeaning = false;
  }

  showTranslation() {
    this.wordTranslation = 'Carregando...';
    this.doShowTranslation = true;
    this.getWordTranslation();
    console.log(this.wordTranslation);
  }

  hideTranslation() {
    this.doShowTranslation = false;
  }

  /** Funções para o Algoritmo SM2 */

  calculateNextRevision() {
    const days = (this.currentCard.reviewedTimes - 1) * this.currentCard.EF;
    console.log(days);
    let revdate = new Date();
    let today = new Date();
    console.log(revdate);
    revdate.setDate(today.getDate() + 2);
    console.log(revdate);
    return revdate.toJSON();
  }

  calculateNewEF(state) {
    const newEF = this.currentCard.EF - 0.8 + (0.28 * state) - (0.02 * state * state);
    return newEF;
  }

}

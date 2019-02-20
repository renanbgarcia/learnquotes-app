import { Component, OnInit } from '@angular/core';
import { GetUserInfo } from './../../services/getUserInfo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs-compat/operator/filter';
import { FlashcardsService } from 'src/app/services/flashcards.service';

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
  currentCard = { word: '', word_id: '', meaning: '', index: 0 };
  deck = [];
  stateEdit;
  doShowMeaning: Boolean = false;
  doShowTranslation: Boolean = false;
  wordTranslation = 'loading';

  constructor(private getInfo: GetUserInfo, 
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private Flashcards: FlashcardsService) {   }

  ngOnInit() {
    //this.getWordsList();
    this.Flashcards.getTodayCards();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionQuantity = params.sessionQuantity;
      this.sessionLanguage = params.sessionLanguage;
    });
/*     this.setDeck().then(() => this.deck = this.flashcards.deck)
    .then(() => { this.currentCard.word = this.deck[0].word;
      console.log(this.deck[0]);
                  this.currentCard.index = 0;
                  this.currentCard.meaning = this.deck[0].meaning;
                  this.currentCard.word_id = this.deck[0]._id }); */ // Select first card of the deck to show
  }
       
  getWordsList() {
    this.getInfo.getUserWords().map((wordList) => this.userWords = wordList).subscribe((wordlist) => console.log(wordlist))
    //ordenar por prioridade
    //pegar só a quantitade que o usuario quer
  }

  //adicionar e-factor e nextReview como campos das palavras

  //pegar o campo nextRevision das palavras
  //se a data do campo for maior ou igual a data atual, colar a carta pra frente no deck
  //se tiver menos cartas do que o número escolhido pelo usuario, repetir cartas
  //senão colocar as cartas no banco de cartas a fazer
  //  

  //fazer o serviço Flashcards controlar a fila de cartas com suas datas, !!!!!!!!
  //sendo chamado já na home para verificar o número de cartas na fila.
  //

  /**
   * Create a shuffled deck with the user words.
   * @author Renan Garcia
   * @return Promise 
   */
  setDeck() {
    const dealer = new Promise((resolve, reject) => {
      this.getInfo.getUserWords().map((wordList) => this.userWords = wordList)
      // .map(() => this.flashcards = new Flashcards(this.userWords))
      .map(() => this.flashcards.shuffle())
      .subscribe(() => resolve());
    });
    return dealer
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
    if (index < deckLength ) {
      console.log(this.deck[index]._id);
      this.currentCard.word = this.deck[index].word;
      this.currentCard.index = index;
      this.currentCard.word_id = this.deck[index]._id;
      this.currentCard.meaning = this.deck[index].meaning;
      this.hideMeaning();
      this.hideTranslation();
      return true
    } else {
      return false
    }
  }

  chooseWordState(state) {
    this.updateWordState(state);
    this.nextCard();
  }

  updateWordState(state) {
    console.log(this.currentCard.word_id);
    this.http.post(`${environment.ENDPOINT}/api/update/word`,  { word_id: this.currentCard.word_id, state: state }).subscribe((res) => { console.log(res); res});
  }

  getWordTranslation() {
    this.http.post('/api/translate', { word: this.currentCard.word }).subscribe((res: {transl: string}) => {console.log(res.transl);this.wordTranslation = res.transl});
  }

  showMeaning() {
    this.doShowMeaning = true;
  }

  hideMeaning() {
    this.doShowMeaning = false;
  }

  showTranslation() {
    this.wordTranslation = "Carregando..."
    this.doShowTranslation = true;
    this.getWordTranslation();
    console.log(this.wordTranslation);
  }

  hideTranslation() {
    this.doShowTranslation = false;
  }

}

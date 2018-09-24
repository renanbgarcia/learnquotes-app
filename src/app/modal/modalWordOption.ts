import { VocabComponent } from './../vocab/vocab.component';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ApplicationRef, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GetUserInfo } from '../services/getUserInfo.service';


@Component({
    selector: 'modal-word-option',
    template: `
  <div class="container-fluid text-center">
    <div class="modal-header">
      Editar
    </div>
    <div class="modal-body">
    <form class="form">
      <div class="form-group">
        <label>Palavra: </label>
        <input class="form-control" type="text" value="{{word.word}}" id="word-edit">
      </div>
      <div class="form-group">
        <label>Significado: </label>
        <input class="form-control" type="text"  value="{{word.meaning}}" id="meaning-edit">
      </div>
      <div class="form-group">
        <label>Estado: </label>
        <select class="form-control" id="state-edit">
          <option [selected]="word.howKnown == 1" value="1">1-Desconhecida</option>
          <option [selected]="word.howKnown == 2" value="2">2-Já vista</option>
          <option [selected]="word.howKnown == 3" value="3">3-Familiar</option>
          <option [selected]="word.howKnown == 4" value="4">4-Conhecida</option>
          <option [selected]="word.howKnown == 5" value="5">5-Aprendida</option>
        </select>
      </div>
    </form>
      <button class="btn btn-warning" (click)="deleteWord()">Deletar Palavra</button>
      <button class="btn btn-success" (click)="updateWord()">Confirmar</button>
    </div>
    </div>
  `
})

export class ModalWordOptionComponent {
    public title: string;
    public list: any[] = [];
    word: {_id: String};
    wordEdit: String;
    meaningEdit: String;
    stateEdit: String;

    @Output() action = new EventEmitter();

    constructor(private modalref: BsModalRef,
                private http: HttpClient,
                private getInfo: GetUserInfo,) { }


  getFirstTime() {
    this.wordEdit = (<HTMLInputElement>document.getElementById("word-edit")).value;
    this.meaningEdit = (<HTMLInputElement>document.getElementById("meaning-edit")).value;
    this.stateEdit = (<HTMLInputElement>document.getElementById("state-edit")).value;
  }

  deleteWord() {
    if (window.confirm("Realmente quer deletar essa palavra?")) {
      this.http.post('/api/delete/word', { id: localStorage.getItem('user'), word_id: this.word._id }).subscribe((res) => { console.log(res); this.getWords()});
      this.modalref.hide();
      this.getWords();
    }
  }

  getWords() {
    this.getInfo.getUserWords().subscribe((word) => { console.log(word);
      this.action.emit(word);
      });
  }

  updateWord(e) {
    this.getFirstTime();
    this.http.post('/api/update/word',  { word_id: this.word._id, word: this.wordEdit, meaning: this.meaningEdit, state: this.stateEdit }).subscribe((res) => { console.log(res); this.getWords()});
    this.modalref.hide();
  }
}

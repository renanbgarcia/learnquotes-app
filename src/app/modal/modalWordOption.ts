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
        <input class="form-control" type="text" (keyup)="getWordEdit($event)" id="word-edit">
      </div>
      <div class="form-group">
        <label>Significado: </label>
        <input class="form-control" type="text" (keyup)="getMeaningEdit($event)" id="meaning-edit">
      </div>
      <div class="form-group">
        <label>Estado: </label>
        <select class="form-control" id="howKnown" (change)="getStateEdit()" id="state-edit">
          <option value="1">1-Desconhecida</option>
          <option value="2">2-Já vista</option>
          <option value="3">3-Familiar</option>
          <option value="4">4-Conhecida</option>
          <option value="5">5-Aprendida</option>
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
    stateEdit;

    @Output() action = new EventEmitter();

    constructor(private modalref: BsModalRef,
                private http: HttpClient,
                private getInfo: GetUserInfo,) { }
  
  deleteWord() {
    if (window.confirm("Realmente quer deletar essa palavra?")) {
      this.http.post('/api/delete/word', { id: localStorage.getItem('user'), word_id: this.word._id }).subscribe((res) => { console.log(res); this.getWords(); });
      this.modalref.hide();
    }
  }

  getWords() {
    this.getInfo.getUserWords().subscribe((word) => { console.log(word);
      this.action.emit(word);
      });
  }

  getWordEdit(e) {
    this.wordEdit = e.target.value;
  }

  getMeaningEdit(e) {
    this.meaningEdit = e.target.value;
  }

  getStateEdit(e) {
    this.stateEdit = e.target.value;
  }

  updateWord() {

  }
}

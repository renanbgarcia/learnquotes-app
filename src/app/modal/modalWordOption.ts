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
        <input class="form-control" type="text">
      </div>
      <div class="form-group">
        <label>Significado: </label>
        <input class="form-control" type="text">
      </div>
    </form>
      <button class="btn btn-warning" (click)="deleteWord()">Deletar Palavra</button>
      <button class="btn btn-success" >Confirmar</button>
    </div>
    </div>
  `
})

export class ModalWordOptionComponent {
    public title: string;
    public list: any[] = [];
    word: {_id: String};

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
}

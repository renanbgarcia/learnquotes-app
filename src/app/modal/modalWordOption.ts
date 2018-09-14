import { VocabComponent } from './../vocab/vocab.component';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GetUserInfo } from '../services/getUserInfo.service';


@Component({
    selector: 'modal-word-option',
    template: `
  <div class="container-fluid text-center">
    <div class="modal-header">
      Deletar palavra?
    </div>
    <div class="modal-body">
      <button class="btn btn-warning" (click)="deleteWord()">Deletar</button>
    </div>
    </div>
  `
})
export class ModalWordOptionComponent {
    public title: string;
    public list: any[] = [];
    word: {_id: String};

    constructor(private router: Router,
                private modalref: BsModalRef,
                private vocab: VocabComponent,
                private http: HttpClient,
                private getInfo: GetUserInfo) { }

  deleteWord() {
    // this.vocab.deleteWord(this.word, this.modalref, this.vocab.getWords)
    if (window.confirm("Realmente quer deletar essa palavra?")) {
      this.http.post('/api/delete/word', { id: localStorage.getItem('user'), word_id: this.word._id }).subscribe((res) => { console.log(res); this.getWords(); });
      this.modalref.hide();
    }
  }

  getWords() {
    this.getInfo.getUserWords().subscribe((word) => { console.log(word);
      this.vocab.userWords.next(word);
      console.log(this.vocab.userWords.getValue())
      this.vocab.preShowWords(word);
      });
  }
}

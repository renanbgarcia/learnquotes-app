import { VocabComponent } from './../vocab/vocab.component';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


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
    word: String;

    constructor(private router: Router, private modalref: BsModalRef, private vocab: VocabComponent ) { }

  deleteWord() {
    this.vocab.deleteWord(this.word, this.modalref, this.vocab.getWords)
  }
}

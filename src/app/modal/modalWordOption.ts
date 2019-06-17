import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ApplicationRef, EventEmitter, Output, NgZone } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GetUserInfo } from '../services/getUserInfo.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'modal-word-option',
    template: `

    <div class="modal-body">
      <div class="row">
        <label>Palavra: </label>
        <input class="form-control" type="text" value="{{word.word}}" id="word-edit">
      </div>
      <div class="row">
        <label>Significado: </label>
        <input class="form-control" type="text"  value="{{word.meaning}}" id="meaning-edit">
      </div>
      <div class="row">
        <label>Estado: </label>
        <select class="form-control" id="state-edit">
          <option [selected]="word.howKnown == '1'" value="1">1-Desconhecida</option>
          <option [selected]="word.howKnown == '2'" value="2">2-Já vista</option>
          <option [selected]="word.howKnown == '3'" value="3">3-Familiar</option>
          <option [selected]="word.howKnown == '4'" value="4">4-Conhecida</option>
          <option [selected]="word.howKnown == '5'" value="5">5-Aprendida</option>
        </select>
      </div>
      <div class="row">
        <button mz-button class="btn btn-warning col s6" (click)="deleteWord()">Deletar Palavra</button>
        <button class="btn btn-secondary btn-margin col s6" (click)="this.modalref.hide();">Cancelar</button>
      </div>
      <div class="row">
        <button class="btn btn-success btn-margin col s12" (click)="updateWord()">Confirmar</button>
      </div>
    </div>

  `,
  styles: [`.btn-margin { margin-left: 5px !important;}`]
})

export class ModalWordOptionComponent {
    public title: string;
    public list: any[] = [];
    word: {_id: String, word: String, meaning: String, howKnown: String};
    wordEdit: String;
    meaningEdit: String;
    stateEdit: String;

    @Output() action = new EventEmitter();

    constructor(private modalref: BsModalRef,
                private http: HttpClient,
                private getInfo: GetUserInfo,
                private zone: NgZone) { }


  getFirstTime() {
    this.wordEdit = (<HTMLInputElement>document.getElementById("word-edit")).value;
    this.meaningEdit = (<HTMLInputElement>document.getElementById("meaning-edit")).value;
    this.stateEdit = (<HTMLInputElement>document.getElementById("state-edit")).value;
  }

  deleteWord() {
/*     if (window.confirm("Realmente quer deletar essa palavra?")) { */
      this.http.post(`${environment.ENDPOINT}/api/delete/word`, { id: localStorage.getItem('user'), word_id: this.word._id }).subscribe((res) => { console.log(res); this.getWords()});
      this.modalref.hide();
      this.getWords();
/*     } */
  }

  getWords() {
    this.getInfo.getUserWords().subscribe((word) => { console.log(word);
      this.action.emit(word);
      });
      
      console.log("getwords 2 chamado")
  }

  updateWord() {
    this.getFirstTime();
    this.http.post(`${environment.ENDPOINT}/api/update/word`,  { word_id: this.word._id, word: this.wordEdit, meaning: this.meaningEdit, state: this.stateEdit }).subscribe((res) => { console.log(res); this.getWords()});
    this.modalref.hide();
  }

}

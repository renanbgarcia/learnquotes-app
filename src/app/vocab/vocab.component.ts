import { HttpClient } from '@angular/common/http';
import { GetUserInfo } from './../services/getUserInfo.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.css']
})
export class VocabComponent implements OnInit {

  userQuotes = new BehaviorSubject([{quote: 'loading', source:'loading', show:true}]);
  userWords = new BehaviorSubject(['loading']);
  keyword = new BehaviorSubject(' ');
  filterState = new BehaviorSubject("0");

  constructor(private getInfo: GetUserInfo, private http: HttpClient) { }

  ngOnInit() {
    this.getQuotes();
    this.getWords();
  }

  getQuotes() {
    this.getInfo.getUserQuotes().subscribe((quotes) => { console.log(quotes);
      this.preShowQuotes(quotes);
      this.userQuotes.next(quotes) });
  }

  getWords() {
    this.getInfo.getUserWords().subscribe((word) => { console.log(word);
      this.preShowWords(word);
      this.userWords.next(word) });
  }

  registerQuoteK(e) {
    this.keyword.next(e.target.value);
    this.verifyQuotes();
  }

  registerWordK(e) {
    this.keyword.next(e.target.value);
    this.verifyWords();
  }

  verifyWordFilter() {
    console.log('ativouxa');
    let el: any = document.getElementById("filter-estados");
    let wf = el.options[el.selectedIndex].value;
    this.filterState.next(wf);
  }

  verifyQuotes() {
    for (let quote of this.userQuotes.getValue()) {
      let re = RegExp(this.keyword.getValue(), 'g');
      let shouldShow = re.test(quote.quote);
      quote.show = shouldShow;
    }
  }

  verifyWords() {
    for (let word of this.userWords.getValue()) {
      console.log(word);
      let re = RegExp(this.keyword.getValue(), 'g');
      let shouldShow = re.test(word.word);
      word.show = shouldShow;
    }
  }

  preShowQuotes(quotes) {
    for (let quote of quotes) {
      quote.show = true;
    }
  }

  preShowWords(words) {
    for (let word of words) {
      word.show = true;
    }
  }

  deleteWord(word) {
    if (window.confirm("Realmente quer deletar essa palavra?")) {
      this.http.post('/api/delete/word', { id: localStorage.getItem('user'), word_id: word._id }).subscribe((res) => { console.log(res); this.getWords(); });
    }
  }

}

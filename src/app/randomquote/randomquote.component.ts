import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { RandomquoteService } from '../randomquote.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as textVersion from "textversionjs";


@Component({
  selector: 'app-randomquote',
  templateUrl: './randomquote.component.html',
  styleUrls: ['./randomquote.component.css'],
  animations: [
    trigger('buttonAtt', [
      state('inactive', style({
        // transform: 'scale(1)',
        backgroundColor: 'red'
      })),
      state('active', style({
        // transform: 'scale(1.2)',
        backgroundColor: 'orange'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class RandomquoteComponent implements OnInit {

  constructor(private randomservice: RandomquoteService, private http: HttpClient, private el: ElementRef) { }

  quoteText: string = this.randomservice.quote.getValue().text;
  rawQuoteText: string = '';
  words: string[];
  quoteSource: string = '';
  usingLang: string = this.randomservice.lang.getValue()
  showSpin: boolean = false;
  showQuote: boolean = true;
  quotes = '';
  bState = 'active';
  toBounce = true;
  isTextNew = false;

  ngOnInit() {
    let that = this;
    this.randomservice.quote.subscribe(
      function (x) {
        if (x.text.length > 4) {
          that.rawQuoteText = x.text;
          that.quoteSource = x.source;
          that.doToggleSpin();
          that.treatQuote();
        } else {
          console.log('deu ruim');
          //console.log(reg.test(x.text));
          console.log(x.text);
          if (that.randomservice.quote.getValue().text !== 'carregando') {
            that.randomservice.getRes()
          }
        }
      }
    )
    this.getLang();
    console.log("mudou");
  }

  treatQuote() {
    let text = textVersion(this.rawQuoteText);
    let words = text.split(' ');
    let newText = '';
    // for (let word of words) {
    //   newText = newText.concat(`<span appHighlightText (click)="console.log('hello its me')">${word} </span>`);
    // }
    this.words = words;
  } 

  doToggleSpin(): void {
    if (this.quoteText === 'carregando') {
      this.showSpin = true;
      this.showQuote = false;
    } else {
      this.showSpin = false;
      this.showQuote = true;
      this.bState = 'active';
    }
  }

  getLang(): void {
    const that = this;
    this.randomservice.lang.subscribe(
      lang => that.usingLang = lang
    )
  }

  getAnotherQuote(): void {
    if (this.bState === 'active') {
      this.showSpin = true;
      this.showQuote = false;
      this.toBounce = false;
      this.bState ='inactive';
      this.randomservice.getRes()
    }
  }

  changeLanguage(lang): void {
    this.randomservice.changeLanguage(lang)
  }

  bounce(): void {
    if (this.toBounce === true) {
      if (this.bState === 'active') {
        this.bState = 'inactive';
      } else {
        this.bState = 'active';
      }
    }
  }

  insertQuote() {
    if (this.quoteText !== 'Quer uma citação?') {
      this.http.post('/api/save/quote', { id: localStorage.getItem('user'), quote: this.quoteText, source: this.quoteSource }).subscribe((res) => console.log(res));
    }
  }

  highlightText() {
    let text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    console.log(text);
    }
  }
}

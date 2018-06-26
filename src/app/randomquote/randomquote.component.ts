import { Component, OnInit } from '@angular/core';
import {RandomquoteService} from '../randomquote.service';


@Component({
  selector: 'app-randomquote',
  templateUrl: './randomquote.component.html',
  styleUrls: ['./randomquote.component.css']
})
export class RandomquoteComponent implements OnInit {

  constructor(private randomservice: RandomquoteService) { }

  quoteText: string = this.randomservice.quote.getValue().text
  quoteSource: string = ''
  usingLang: string = this.randomservice.lang.getValue()
  showSpin: boolean = true;
  showQuote: boolean = false;

  ngOnInit() {
    this.randomservice.getRes()
    let that = this
    let reg: RegExp = new RegExp(/Quotes|H2|headline|toctext/)
    this.randomservice.quote.subscribe(
      function (x) {
        if (!reg.test(x.text) && x.text.length > 4) {
          that.quoteText = x.text;
          that.quoteSource = x.source;
        } else {
          console.log('deu ruim')
          that.randomservice.getRes()
        }
        that.doToggleSpin()
      }
    )
    this.getLang()
  }

  doToggleSpin(): void {
    if(this.quoteText !== 'carregando') {
      this.showSpin = false;
      this.showQuote = true;
    } else {
      this.showSpin = true;
      this.showQuote = false;
    }
  }

  getLang(): void {
    const that = this;
    this.randomservice.lang.subscribe(
      lang => that.usingLang = lang
    )
  }

}

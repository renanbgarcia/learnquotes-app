import { Component, OnInit } from '@angular/core';
import {RandomquoteService} from '../randomquote.service'

@Component({
  selector: 'app-randomquote',
  templateUrl: './randomquote.component.html',
  styleUrls: ['./randomquote.component.css']
})
export class RandomquoteComponent implements OnInit {

  constructor(private randomservice: RandomquoteService) { }

  quoteText = this.randomservice.quote.getValue().text
  quoteSource = ''
  usingLang = this.randomservice.lang.getValue()

  ngOnInit() {
    this.randomservice.getRes()
    let that = this
    let reg = new RegExp(/Quotes|H2|headline|toctext/)
    this.randomservice.quote.subscribe(
      function (x) {
        if (!reg.test(x.text) && x.text.length > 4) {
          that.quoteText = x.text;
          that.quoteSource = x.source
        } else {
          console.log('deu ruim')
          that.randomservice.getRes()
        }
      }
    )
    this.getLang()
  }

  getLang() {
    const that = this;
    this.randomservice.lang.subscribe(
      lang => that.usingLang = lang
    )
  }

}

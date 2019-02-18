import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { RandomquoteService } from '../../services/randomquote.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertModule  } from 'ngx-bootstrap/alert';
import * as textVersion from "textversionjs";
import { ContextMenuComponent } from '../../../../node_modules/ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';
import { BehaviorSubject } from 'rxjs';
import { PopoverConfig } from 'ngx-bootstrap/popover';
import { environment } from 'src/environments/environment';

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'left',
    container: 'body',
    triggers: 'focus'
  });
}

@Component({
  selector: 'app-randomquote',
  templateUrl: './randomquote.component.html',
  styleUrls: ['./randomquote.component.css'],
  providers: [{ provide: PopoverConfig, useFactory: getPopoverConfig }],
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

  constructor(private randomservice: RandomquoteService, private http: HttpClient, private el: ElementRef, private contextMenuService: ContextMenuService) { }

  quoteText: string = this.randomservice.quote.getValue().text;
  treatedQuoteText: String;
  quoteTranslation = new BehaviorSubject('Loading...');
  wordTranslation =  new BehaviorSubject('Carregando...');
  audioSource = new BehaviorSubject('');
  words: string[];
  quoteSource: string = '';
  usingLang: string = this.randomservice.lang.getValue()
  showSpin: boolean = false;
  showQuote: boolean = true;
  quotes = '';
  bState = 'active';
  toBounce = true;
  showAudioControls = false;
  isTextNew = false;
  showAlert: boolean = false;
  clickedWord: any;
  meaning: String;
  howKnown: any;


  ngOnInit() {
    let that = this;
    this.randomservice.quote.subscribe(
      function (x) {
        if (x.text.length > 4) {
          that.quoteText = x.text;
          that.quoteSource = x.source;
          that.treatQuote();
          that.doToggleSpin();
        } else {
          console.log('deu ruim');
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

    let config = {
      linkProcess: function(href, linkText){
          return linkText;
      }
    };

    let text = textVersion(this.quoteText, config);

    text = text.replace(/&#160;/g, ''); //Tira esse negócio que aparece as vezes na citação
    console.log('textoo = '+ text);
    this.treatedQuoteText = text;

    let words = text.split(' ');
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
    this.audioSource.next('');
    this.showAudioControls = false;
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
      this.http.post(`${environment.ENDPOINT}/api/save/quote`, { id: localStorage.getItem('user'), quote: this.treatedQuoteText, source: this.quoteSource }).subscribe((res: any) => {
      if (res.response == 'success') { this.confirmationAlert(); }
      });
    }
  }

  insertWord() {
    let el:any = document.getElementById("howKnown");
    let hk = el.options[el.selectedIndex].value;
    this.http.post(`${environment.ENDPOINT}/api/save/word`, { id: localStorage.getItem('user'), word: this.clickedWord, meaning: this.meaning, howKnown: hk }).subscribe((res: any) => {
      if (res.response === 'success') { this.confirmationAlert();}
    });
  }

  getTranslation() {
      this.quoteTranslation.next('Carregando...') //reseta texto do popover
      this.http.post(`${environment.ENDPOINT}/api/translate`, { word: this.treatedQuoteText }).subscribe((res: {transl: string}) => this.quoteTranslation.next(res.transl));
  }

  getWordTranslation() {
    this.http.post(`${environment.ENDPOINT}/api/translate`, { word: this.clickedWord }).subscribe((res: {transl: string}) => this.wordTranslation.next(res.transl));
  }

  getQuoteAudio() {
    this.audioSource.next(`${environment.ENDPOINT}/api/talk?text=${this.treatedQuoteText}&lang=${this.usingLang}`);
    const audiop: any = document.getElementById("quoteAudio");
    audiop.autoplay = true;
    audiop.load();
    this.showAudioControls = true;
  }

  saveKeys(event: any) {
    this.meaning = event.target.value;
  }

  dontClose(ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  confirmationAlert() {
    this.showAlert = true;
    window.setTimeout(() => this.showAlert = false, 2000);
  }

  @ViewChild(ContextMenuComponent) public wordsave: ContextMenuComponent;

  @Input() contextMenu: ContextMenuComponent;

  public onContextMenu($event: any, item: any): void {
    this.contextMenuService.show.next({
      anchorElement: document.getElementById('barra-topo'),
      contextMenu: this.contextMenu,
      event: $event,
      item: item,
    });
    $event.preventDefault();
    $event.stopPropagation();
    this.clickedWord = $event.target.innerText;
    this.getWordTranslation();
  }

}

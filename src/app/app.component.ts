import { Component } from '@angular/core';
import { RandomquoteService } from './randomquote.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  // title = 'LearnQuotes';
  // quotes = ''

  // constructor(private randomservice: RandomquoteService, private http: HttpClient){}

  // getAnotherQuote() {
  //   this.randomservice.getRes()
  // }

  // changeLanguage(lang) {
  //   this.randomservice.changeLanguage(lang)
  // }

  // getUser() {
  //   this.http.get('/api/user').subscribe((res) => console.log(res));
  // }
}


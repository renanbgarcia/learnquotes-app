import { GetUserInfo } from './../../../services/getUserInfo.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userPhoto = new BehaviorSubject('');
  userName = new BehaviorSubject('Loading');
  userLevel = new BehaviorSubject('loading');
  userScore = new BehaviorSubject(0);
  userQuotes = new BehaviorSubject(['loading']);
  quoteCount = new BehaviorSubject(0);
  userWordsCount;
  userMetaField;
  actualMeta = new BehaviorSubject(0);
  wordsStillDue = new BehaviorSubject(0);
  wordsLearnedToday;
  rangeValue = new BehaviorSubject(10);

  constructor(private http: HttpClient, private getuserinfo: GetUserInfo, private router: Router) { }

  ngOnInit() {
    this.getuserinfo.getUserPhoto().subscribe((photo) => this.userPhoto.next(photo));
    this.getuserinfo.getUserName().subscribe((name) => this.userName.next(name));
    this.getuserinfo.getUseLevel().subscribe((level) => this.userLevel.next(level));
    this.getuserinfo.getUserScore().subscribe((score) => this.userScore.next(score));
    this.getuserinfo.getUserQuotes().subscribe((quotes) => { console.log(quotes); this.userQuotes.next(quotes)});
    this.getuserinfo.getUserQuotesCount().subscribe((length) => this.quoteCount.next(length.count));
    this.getuserinfo.getUserWords().subscribe((words) => this.userWordsCount = words.length);
    this.getStillDue();
    this.learnedToday();
    this.getMeta();
  }

  showRangeValue(e) {
    this.rangeValue.next(e.target.value);
  }

  setMeta() {
    this.getuserinfo.setMeta(this.userMetaField).subscribe((res) => {console.log(res); /*this.getMeta()*/});
/*     let sel = document.querySelector("#metaInput");
    console.log(sel); */
  }

  getMeta() {
    this.getuserinfo.getMeta().subscribe((res: any) => {console.log(res);this.actualMeta.next(res.meta)});
  }

  updateMetaField(e) {
    this.userMetaField = e.target.value;
  }

  learnedToday() {
    this.getuserinfo.getLearnedToday().subscribe((learned) => this.wordsLearnedToday = learned);
  }

  getStillDue() {
    this.getuserinfo.getLearnedToday().subscribe((learned) => this.getuserinfo.getMeta()
                                      .subscribe((res) => {this.wordsStillDue.next(this.actualMeta.getValue() - learned)}));
  }
}

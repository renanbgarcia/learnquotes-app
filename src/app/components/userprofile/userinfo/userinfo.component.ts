import { GetUserInfo } from './../../../services/getUserInfo.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

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

  constructor(private http: HttpClient, private getuserinfo: GetUserInfo, private router: Router) { }

  ngOnInit() {
    this.getuserinfo.getUserPhoto().subscribe((photo) => this.userPhoto.next(photo));
    this.getuserinfo.getUserName().subscribe((name) => this.userName.next(name));
    this.getuserinfo.getUseLevel().subscribe((level) => this.userLevel.next(level));
    this.getuserinfo.getUserScore().subscribe((score) => this.userScore.next(score));
    this.getuserinfo.getUserQuotes().subscribe((quotes) => { console.log(quotes); this.userQuotes.next(quotes)});
    this.getuserinfo.getUserQuotesCount().subscribe((length) => this.quoteCount.next(length.count));
  }

  putScore() {
    this.getuserinfo.setUserScore(25).subscribe((res) => {
      console.log(res); this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/home/profile"]));}); ///teste navega pra outrarota e volta para recarregar pontos atual na tela
  }

}

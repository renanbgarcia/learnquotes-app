import { GetUserInfo } from './../../services/getUserInfo.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userPhoto = new BehaviorSubject('');
  userName = new BehaviorSubject('Loading');
  userLevel = new BehaviorSubject('loading');
  userScore = new BehaviorSubject('loading');

  constructor(private http: HttpClient, private getuserinfo: GetUserInfo) { }

  ngOnInit() {
    this.getuserinfo.getUserPhoto().subscribe((photo) => {this.userPhoto.next(photo)});
    this.getuserinfo.getUserName().subscribe((name) => this.userName.next(name));
    this.getuserinfo.getUseLevel().subscribe((level) => this.userLevel.next(level));
    this.getuserinfo.getUserScore().subscribe((score) => this.userScore.next(score));
  }
}

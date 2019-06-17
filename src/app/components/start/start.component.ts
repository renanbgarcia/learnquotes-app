import { Component, OnInit } from '@angular/core';
import { GetUserInfo } from './../../services/getUserInfo.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  userMeta = 15;
  userMetaFaltando = 15;
  wordsLearnedToday = 0;

  constructor(private getuserinfo: GetUserInfo) { }

  ngOnInit() {
    this.getUserMeta();
    this.learnedToday();
  }

  getUserMeta() {
    this.getuserinfo.getMeta().subscribe((res: any) => this.userMeta = res.meta);
  }

  learnedToday() {
    this.getuserinfo.getLearnedToday().subscribe((learned) => this.wordsLearnedToday = learned);
  }

}

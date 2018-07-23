import { GetUserInfo } from './../services/getUserInfo.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from '../modal/lOutmodal'

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css'],
  animations: [
    trigger('menuState', [
      state('inactive', style({
        left: '-999px'
      })),
      state('active', style({
        left: '0px'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class MockComponent implements OnInit {
  title = 'LearnQuotes';
  isCollapsed = false;
  state = 'inactive';
  userName = new BehaviorSubject('User');
  userPhoto = new BehaviorSubject('');
  modalRef: any;
  
  constructor( private http: HttpClient,
    private getuserinfo: GetUserInfo,
    private modalService: BsModalService,
    private router: Router) { 

    router.events.subscribe((val: any) => {
      switch (val.url){
        case "/home/randomquote":
          document.body.style.background = '#FEDFBF';
          break;
        case "/home":
          document.body.style.background = '#BFF6FE';
          break;
        case "/home/profile":
          document.body.style.background = '#FEBFF2';
          break;
      }
    });
  }

  ngOnInit() {
    this.getuserinfo.getUserPhoto().subscribe((photo) => this.userPhoto.next(photo));
    this.getuserinfo.getUserName().subscribe((name) => this.userName.next(name));
    console.log('mock chamado');
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  openConfirmDialog() {
    this.modalRef = this.modalService.show(ModalContentComponent);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    })
  }

  closeDialog() {
    this.modalRef.close();
  }

}


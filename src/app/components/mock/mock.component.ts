import { GetUserInfo } from './../../services/getUserInfo.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../../modal/lOutmodal'

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
  title = 'LingoTreno';
  isCollapsed = false;
  state = 'inactive';
  userName = new BehaviorSubject('User');
  userPhoto = new BehaviorSubject('');
  modalRef: any;
  
  constructor(private getuserinfo: GetUserInfo, private modalService: BsModalService) { }

  ngOnInit() {
    this.getuserinfo.getUserPhoto().subscribe((photo) => this.userPhoto.next(photo));
    this.getuserinfo.getUserName().subscribe((name) => this.userName.next(name));
    console.log('mock chamado');
    const that = this;
    document.addEventListener('click', function(e: any) {
      if (that.state === 'active' && e.target.id !== 'collapseEvent' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I' && e.target.tagName !== 'LI') {
        that.state = 'inactive';
      }
    });
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



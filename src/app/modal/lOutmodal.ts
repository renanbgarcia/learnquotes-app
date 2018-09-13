import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
 
/* This is a component which we pass in modal*/
 
@Component({
  selector: 'modal-content',
  template: `
  <div class="container-fluid text-center">
    <div class="modal-header">
      Certeza que deseja deslogar??
    </div>
    <div class="modal-body">
      <button class="btn btn-warning" (click)="logOut()">Com certeza!</button>
    </div>
    </div>
  `
})
export class ModalContentComponent {
  public title: string;
  public list: any[] = [];

    constructor(private router: Router, private modalref: BsModalRef) {}

    logOut() {
        localStorage.clear();
        this.modalref.hide();
        this.router.navigate(['/']);
        console.log('deslogado');
    }
}

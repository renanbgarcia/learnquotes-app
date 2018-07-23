import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AuthorizerComponent } from '../authorizer/authorizer.component'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private http: HttpClient, private authorizer: AuthorizerComponent, private router: Router) { 

   }

  ngOnInit() {
    console.log(this.authorizer.token.getValue());
    if (localStorage.length == 0 || localStorage.getItem('token') == 'undefined') {
      console.log('fui chamado');
      localStorage.setItem('token', this.authorizer.token.getValue());
    }
  }
}

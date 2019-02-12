import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizerComponent } from '../../authorizer/authorizer.component'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private http: HttpClient, private authorizer: AuthorizerComponent, private router: Router) { 

   }

  ngOnInit() {
    this.http.post('localhost:8080/api/test', ({'Access-Control-Allow-Origin': '*'})).subscribe((res) => console.log(res));
    console.log(this.authorizer.token.getValue());
    if (localStorage.length == 0 || localStorage.getItem('token') == 'undefined') {
      console.log('fui chamado');
      localStorage.setItem('token', this.authorizer.token.getValue());
    }
  }
}

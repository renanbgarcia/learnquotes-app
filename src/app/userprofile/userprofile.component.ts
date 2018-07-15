import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MockComponent } from '../mock/mock.component'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private http: HttpClient, private authservice: AuthService, private mock: MockComponent) { }

  ngOnInit() {
    console.log(this.mock.token.getValue());
    if (localStorage.length == 0 || localStorage.getItem('token') == 'undefined') {
      console.log('fui chamado');
      localStorage.setItem('token', this.mock.token.getValue());
    }
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
    //   })
    // };
    // this.http.get('/home/teste', httpOptions).subscribe((res) => console.log(res));
    // this.authservice.isAuthenticated().subscribe((res) => console.log(res));
  }

}

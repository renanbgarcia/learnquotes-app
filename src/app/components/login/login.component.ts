import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = environment.ENDPOINT;
  urlHTML =  `<a href='${this.url}/auth/google?client=localhost:4200'>
              <span class="fa fa-google"></span>
              | Entrar com o Google!
              </a>`

  constructor() { }

  ngOnInit() {
  }
}

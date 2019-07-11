import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MzIconMdiModule } from 'ngx-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = environment.GOOGLE_AUTH_ENDPOINT;
  client = environment.CLIENT;
  urlHTML =  `<a href='${this.url}/auth/google?client=${this.client}'>
                <i mz-icon [icon="'google'"]></i>
              | Entrar com o Google!
              </a>`

  constructor() { }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { RandomquoteService } from '../randomquote.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ObjectUnsubscribedError, Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { nextTick } from '../../../node_modules/@types/q';

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
  userPhoto = new BehaviorSubject('https://lh3.googleusercontent.com/-DXYA5kcy7Rw/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7pLWsK3YRuyMInFqx3P6tamKmJtog/mo/photo.jpg?sz=50');
  token = new BehaviorSubject('inicial');
  user: any;
  first: boolean;

  constructor(private randomservice: RandomquoteService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private auth: AuthService) { 

  }

  ngOnInit() {
    console.log('iniciado')
    if (localStorage.length === 0) {
      this.getToken();
    } else {
      console.log(this.token);
    }
  }

  getUser() {
    this.http.get('/api/user').subscribe((res: any) => {
      //localStorage.setItem('user', JSON.stringify(res.user));
      //localStorage.setItem('token', res.token);
      this.userName.next(res.user.displayName);
      this.userPhoto.next(res.user.photos[0].value);
    });
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  getToken() {
    return this.route.queryParams.map((params) => {
      console.log(params['token']);
      this.first = true; 
      if (this.token.getValue() == 'inicial') {
        this.token.next(params['token']); 
      }
      return params['token']
    }).map((token) => {

      const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.token.getValue()
       })
     };
     return this.http.get('/api/auth', httpOptions);

    }).subscribe((auth) => auth.subscribe((res: any) => {
    console.log(res);
    if (res.auth == 'Authenticated') {
      //this.token = res.token;
      console.log(this.token.getValue());
      localStorage.setItem('token', this.token.getValue());
      this.getUser();
      this.router.navigate(['/home/profile'])
    }
    }));
  }

}


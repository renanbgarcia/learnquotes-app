import { AuthGuardService } from '../services/authguard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat';
import { RandomquoteService } from '../randomquote.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-authorizer',
  templateUrl: './authorizer.component.html',
  styleUrls: ['./authorizer.component.css']
})
export class AuthorizerComponent implements OnInit {

  //userName = new BehaviorSubject('User');
  //userPhoto = new BehaviorSubject('https://lh3.googleusercontent.com/-DXYA5kcy7Rw/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7pLWsK3YRuyMInFqx3P6tamKmJtog/mo/photo.jpg?sz=50');

  token = new BehaviorSubject('inicial');
  //user: any;

  constructor(private authorize: AuthGuardService,
             private http: HttpClient,
             private route: ActivatedRoute,
             private router: Router) {
  }

  ngOnInit() {
    console.log('iniciado')
    if (localStorage.length === 0) {
      this.getToken();
    } else {
      console.log(this.token);
      this.route.queryParams.subscribe((params) => {
        console.log(params['token']);
        if (!params['token']) {
          this.router.navigate(['/401']);
        }
        this.getToken();
      })
    }
  }

  getUser() {
    return this.http.get('/api/user').map((res: any) => {
      localStorage.setItem('user', res.user);
      console.log(res);
      return res;
    });
  }

  getToken() {
    return this.route.queryParams.map((params) => {
      console.log(params['token']);
      if (!params['token']) {
        this.router.navigate(['/401']);
      }
      if (this.token.getValue() == 'inicial') {
        this.token.next(params['token']);
        localStorage.setItem('token', params['token']);
      }
    }).subscribe(() => {
      this.authorize.canActivate();
      //localStorage.setItem('token', this.token.getValue());
      this.getUser().subscribe(() => {this.router.navigateByUrl('/home')});
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Authorization': 'Bearer ' + this.token.getValue()
      //   })
      // };
      // this.http.get('/api/auth', httpOptions).subscribe((res: { auth: string, user: any }) => {
      //   localStorage.setItem('user', res.user);
      // });
      //this.router.navigateByUrl('/home');
      });
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Authorization': 'Bearer ' + this.token.getValue()
      //   })
      // };
      // return this.http.get('/api/auth', httpOptions);

    }
    //)
    // .subscribe((auth) => auth.subscribe((res: any) => {
    //   console.log(res);
    //   if (res.auth == 'Authenticated') {
    //     //this.token = res.token;
    //     console.log(this.token.getValue());
    //     localStorage.setItem('token', this.token.getValue());
    //     //localStorage.setItem('user', JSON.stringify(res.user));
    //     //this.getUser();
    //     this.router.navigateByUrl('/home')
    //   } else {
    //     console.log('n auth');
    //     this.router.navigate(['/401']);
    //   }
    // }));
  //}

}

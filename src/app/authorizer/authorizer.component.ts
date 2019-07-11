import { AuthGuardService } from '../services/authguard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authorizer',
  templateUrl: './authorizer.component.html',
  styleUrls: ['./authorizer.component.css']
})
export class AuthorizerComponent implements OnInit {

  token = new BehaviorSubject('inicial');

  constructor(private authorize: AuthGuardService,
             private http: HttpClient,
             private route: ActivatedRoute,
             private router: Router) {
  }

  ngOnInit() {
    console.log('iniciado');
    if (localStorage.length === 0) {
      this.getToken();
    } else {
      console.log(this.token);
      this.route.queryParams.subscribe((params) => {
        console.log(params['token']);
        if (!params['token']) {
          //this.router.navigate(['/401']); COmentado durante desenvolvimento
        }
        this.getToken();
      })
    }
  }

  getUser() {

    return this.route.queryParams.map((params) => {
      console.log(params['user']);
      localStorage.setItem('user', params['user']);
      console.log(localStorage.getItem('user'));
      return params['user']
    })

  }

  getToken() {
    return this.route.queryParams.map((params) => {
      console.log(params['token']);
      if (!params['token']) {
        //this.router.navigate(['/401']);   Comentado durante desenvolvimento
      }
      if (this.token.getValue() == 'inicial') {
        this.token.next(params['token']);
        localStorage.setItem('token', params['token']);
      }
    }).subscribe(() => {
      this.authorize.canActivate();
      this.getUser().subscribe(() => {this.router.navigateByUrl('/home')});
      });
    }
}

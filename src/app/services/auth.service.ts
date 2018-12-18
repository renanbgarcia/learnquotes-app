import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public isAuthenticated() {
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
        return this.http.get(`${environment.ENDPOINT}/api/auth`, httpOptions); // O cliente que for usar o serviço deverá utilizar subscribe...
    }

    // public getUser() {
    //     if (localStorage.length === 0) {
    //         console.log(localStorage.length);
    //         return this.http.get('/api/user').map((res: any) => {
    //             localStorage.setItem('user', JSON.stringify(res.user));
    //             localStorage.setItem('token', res.token);
    //             //return this.isAuthenticated();
    //         }).map(() => this.isAuthenticated());
    //     } else {
    //         return this.isAuthenticated();
    //     }
    // }
}
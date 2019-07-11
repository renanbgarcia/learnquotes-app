import { Injectable } from '@angular/core';
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
        return this.http.get(`${environment.ENDPOINT}/api/auth`, httpOptions);
    }
}
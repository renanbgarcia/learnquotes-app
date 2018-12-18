import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs-compat';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GetUserInfo {


    constructor(private http: HttpClient) { }

    getUser() {
        console.log( localStorage.getItem('user'));
        return this.http.post(`${environment.ENDPOINT}/api/userinfo`, {id: localStorage.getItem('user')});
    }

    getUserPhoto() {
        console.log('getuser photo l21')
        return this.getUser().map((res: any) => {console.log(res); return res.user.photo});
    }

    getUserName() {
        return this.getUser().map((res: any) => res.user.name);
    }

    getUseLevel() {
        return this.getUser().map((res: any) => res.user.level);
    }

    getUserScore() {
        return this.getUser().map((res: any) => res.user.score);
    }

    getUserQuotes() {
        return this.getUser().map((res: any) => {console.log(res); return res.user.resources.quote});
    }

    getUserWords() {
        return this.getUser().map((res: any) => { console.log(res); return res.user.resources.words });
    }

    getUserQuotesCount() {
        return this.http.post(`${environment.ENDPOINT}/api/countquotes`, { id: localStorage.getItem('user') }).map((res: any) => res );
    }

    setUserScore(score: number) {
        return this.http.post(`${environment.ENDPOINT}/api/setuserinfo`, { id: localStorage.getItem('user'), type: 'score', info: score });
    }
}
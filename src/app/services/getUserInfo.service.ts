import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs-compat';

@Injectable({
    providedIn: 'root'
})
export class GetUserInfo {


    constructor(private http: HttpClient) { }

    getUser() {
        return this.http.post('/api/userinfo', {id: localStorage.getItem('user')});
    }

    getUserPhoto() {
        return this.getUser().map((res: any) => res.user.photo);
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

    // getUserWords() {
    //     //
    // }

    setUserScore(score: number) {
        return this.http.post('/api/setuserinfo', { id: localStorage.getItem('user'), type: 'score', info: score });
    }
}
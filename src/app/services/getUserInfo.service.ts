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

    setMeta(userMetaField) {
        return this.http.post(`${environment.ENDPOINT}/api/set/meta`, {meta: userMetaField, id: localStorage.getItem('user')});
    }
    
    getMeta() {
        return this.http.post(`${environment.ENDPOINT}/api/get/meta`, {id: localStorage.getItem('user')});
    }

/*     getLearnedToday() {
        return this.http.post(`${environment.ENDPOINT}/api/get/learnedToday`, {id: localStorage.getItem('user')});
    } */
    

    getLearnedToday() {
       return this.getUserWords().map((words) => {
          console.log(words);
          let counter = 0;
          let today = new Date();
          today.setHours(0,0,0,0);
          for (let word of words) {
            let data = new Date(word.lastHowKnown)
            console.log(data);
            if (word.howKnown === "5" && data > today) {
              counter++;
              console.log(data + " - " + today);
            }
          }
          console.log(counter);
          return counter;
        })
      }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs'

@Injectable()

export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }

    canActivate(): any {
        console.log('AuthGuard#canActivate called');
        this.auth.isAuthenticated().subscribe((res: any) => {
            // if (res instanceof Observable) {
            //     res.subscribe((res) => {
            //         if (res.auth !== 'Authenticated') {
            //             console.log('not authenticated');
            //             this.router.navigate(['/']);
            //             return false;
            //         } else {
            //             console.log(res)
            //             console.log("Authenticated!!!");
            //             return true
            //         }
            //     }) } else
             if ( res.auth !== 'Authenticated' ) {
                console.log(res);
                return false;
            } else if (!res.auth) {
                return false
            } else {
                console.log('authenticated mode 2');
            }
        }, (error) => { console.log(error); this.router.navigate(['/401'])})
        return true;
    }
}
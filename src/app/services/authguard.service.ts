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
             if ( res.auth !== 'Authenticated' ) {
                console.log(res);
                return false;
            } else if (!res.auth) {
                return false
            } else {
                console.log('authenticated mode 2');
            }
        }, (error) => { console.log(error); this.router.navigate(['/401'])})  // Comentado durante desenvolvimento
        return true;
    }
}
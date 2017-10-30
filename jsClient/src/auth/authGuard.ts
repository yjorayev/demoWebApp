import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private _authService: AuthService, private _router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivateInternal(route, state);
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivateInternal(childRoute, state);
    }

    private canActivateInternal(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url = state.url;

        return this._authService.isAuthorized().map(isAuthorized => {
            if (isAuthorized) {
                return true;
            }

            this._authService.redirectToLoginFrom(url);
            return false;
        });
    }
}
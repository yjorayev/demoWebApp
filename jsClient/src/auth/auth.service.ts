import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { User } from 'oidc-client';
import { Router } from '@angular/router';
//import * as Oidc from "oidc-client";
import { Observable } from 'rxjs/Observable';
import * as Oidc from "oidc-client";

@Injectable()
export class AuthService {

    private _redirectedFromUrl: string;
    private _manager: Oidc.UserManager;

    constructor(
        private _router: Router
    ) {
        Oidc.Log.logger = console;

        let settings = {
            authority: "http://localhost:5000",
            client_id: "js",
            loadUserInfo: true,
            redirect_uri: "http://localhost:5003/logincallback",
            post_logout_redirect_uri: "http://localhost:5003/logoutcallback",
            silent_redirect_uri: "http://localhost:5003/loginrenew",
            response_type: "id_token token",
            scope: "openid profile api"
        } as Oidc.UserManagerSettings;

        this._manager = new Oidc.UserManager(settings);
        //this._manager.addSilentRenewError(error => this.onSilentRenewError(error));
    }

    public createUnauthorizedResponse(error: any): Observable<any> {

        let promise = this._manager.removeUser();

        return Observable.fromPromise(promise)
            .mergeMap(() => this.redirectToLogin())
            .mergeMap(response => {
                if (response) {
                    return Observable.of(null);
                }

                return Observable.throw(error);
            });
    }

    public getAuthorizationHeader(): Observable<string | null> {

        return this.getUser().mergeMap(user => {
            if (user && user.access_token) {
                return Observable.of(`Bearer ${user.access_token}`);
            }

            return Observable.of(null);
        });
    }

    private getUser(): Observable<User> {

        let promise = this._manager.getUser();
        return Observable.fromPromise(promise).map(user => {
            return user;
        });
    }

    public getAuthorizationUrlParameter(): Observable<string | null> {

        return this.getUser().mergeMap(user => {
            if (user && user.access_token) {
                return Observable.of(`bt=${encodeURIComponent(user.access_token)}`);
            }

            return Observable.of(null);
        });
    }

    public getUserInfo(): Observable<any> {

        return this.getUser().map(user => {
            let userInfo: any = new Object();

            if (user) {
                let profile: any = user.profile;
                Object.keys(profile).forEach(prop => {
                    userInfo[prop] = profile[prop];
                });
            }

            return userInfo;
        });
    }

    public isAuthorized(): Observable<boolean> {

        return this.getUser().map(user => {
            if (user) {
                return true;
            } else {
                return false;
            }
        });
    }

    public requestSignIn(): void {

        this._manager.signinRedirect({ data: this._redirectedFromUrl });
    }

    public redirectToLogin(): Observable<boolean> {

        let url = this._router.routerState.snapshot.url;
        return this.redirectToLoginFrom(url);
    }

    public redirectToLoginFrom(url: string): Observable<boolean> {

        this._redirectedFromUrl = url;
        let promise = this._router.navigate(['/login']);
        return Observable.fromPromise(promise);
    }

    private redirectToSecuredResource(url: string): void {
        if (url && !url.startsWith('/login')) {
            this._router.navigateByUrl(url);
        } else {
            this._router.navigate(['/home']);
        }
    }

    public onSignedIn(): void {
        this._manager.signinRedirectCallback().then((user: any) => {
            this.redirectToSecuredResource(user.state);
        }, (error: any) => {
            this.requestSignIn();
        });
    }

    public requestSignOut(): void {
        this._manager.signoutRedirect().then(() => {
            console.log('AuthService.requestSignOut() - success.');
            localStorage.clear();
            sessionStorage.clear();
        });
    }

    public onSignedOut(): void {

        this._manager.signoutRedirectCallback();
    }

    public requestSilentRenew(): void {

        this._manager.signinSilent();
    }

    public onSilentRenew(): void {

        this._manager.signinSilentCallback();
    }

    //private onSilentRenewError(error: any): void {

    //    console.error(error);
    //    this.redirectToLogin();
    //}
}
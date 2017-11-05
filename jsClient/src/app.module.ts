import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { LoginCallbackComponent } from './auth/login-callback.component';
import { LogoutCallbackComponent } from './auth/logout-callback.component';
import { LoginRenewComponent } from './auth/login-renew.component';
import { LogoutComponent } from './auth/logout.component';
import { LoginComponent } from './auth/login.component';


import { AuthService } from './auth/auth.service';
import { SecureHttp } from './auth/secureHttp';
import { AuthGuard } from './auth/authGuard';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
            {
                path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
                    { path: '', redirectTo: '', pathMatch: 'full' },
                    { path: 'counter', component: CounterComponent }
                ]
            },
            { path: 'login', component: LoginComponent },
            { path: 'logincallback', component: LoginCallbackComponent },
            { path: 'loginrenew', component: LoginRenewComponent },
            { path: 'logout', component: LogoutComponent },
            { path: 'logoutcallback', component: LogoutCallbackComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        LoginCallbackComponent,
        LogoutCallbackComponent,
        LoginRenewComponent,
        NavMenuComponent,
        CounterComponent,
        HomeComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        {
            provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, router: Router, authService: AuthService) => {
                return new SecureHttp(backend, defaultOptions, router, authService);
            },
            deps: [XHRBackend, RequestOptions, Router, AuthService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

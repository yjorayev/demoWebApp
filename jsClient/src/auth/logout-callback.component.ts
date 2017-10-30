import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'one-logout-callback',
    templateUrl: './logout-callback.component.html'
})
export class LogoutCallbackComponent implements OnInit {

    constructor(private _authService: AuthService, private _router: Router) { }

    public ngOnInit(): void {

        console.log('LogoutCallbackComponent.ngOnInit() called.');
        this._authService.onSignedOut();
        this._router.navigate(['/login']);
    }
}

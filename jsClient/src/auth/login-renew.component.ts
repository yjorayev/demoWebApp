import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'login-renew',
    templateUrl: './login-renew.component.html'
})
export class LoginRenewComponent implements OnInit {

    constructor(private _authService: AuthService) { }

    public ngOnInit(): void {

        this._authService.onSilentRenew();
    }
}

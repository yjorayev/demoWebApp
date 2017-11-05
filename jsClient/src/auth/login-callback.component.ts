import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'one-login-callback',
    templateUrl: './login-callback.component.html'
    //styleUrls: ['../../styles/login-callback.component.scss']
})
export class LoginCallbackComponent {

    constructor(private _authService: AuthService) { }

    public ngOnInit(): void {

        this._authService.onSignedIn();
    }
}

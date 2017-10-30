import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private _authService: AuthService) { }

    public ngOnInit(): void {

        this._authService.requestSignIn();
    }
}

import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html'
})

export class LogoutComponent {

    constructor(private _authService: AuthService) { }

    ngOnInit() {
        this._authService.requestSignOut();
    }
}

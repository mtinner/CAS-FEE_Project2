import {Component} from '@angular/core';
import {LoginHttpService} from './login-http.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    private email = 'appUser@admin.ch';
    private password = 'pwd';

    constructor(private loginService: LoginHttpService) {
    }

    setEmail(value) {
        this.email = value;
    };

    setPassword(value) {
        this.password = value;
    };

    login = () => {
        this.loginService.login(this.email, this.password);
    };
}

import {Component, Injectable} from '@angular/core';
import {LoginHttpService} from './login-http.service';


@Injectable()
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    private inputField: Object = {
        email: {placeholder: 'Email', type: 'text'},
        password: {placeholder: 'Password', type: 'password'}
    };

    constructor(private loginService: LoginHttpService) {
    }

    email = 'appUser';
    password = 'pwd';

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

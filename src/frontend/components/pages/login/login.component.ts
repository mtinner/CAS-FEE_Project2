import {Component, Injectable} from '@angular/core';
import {LoginService} from './login.service';


@Injectable()
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    private inputField: Object = {
        username: {placeholder: 'Username', type: 'text'},
        password: {placeholder: 'Password', type: 'password'}
    };

    constructor(private loginService: LoginService) {
    }

    username = 'admin';
    password = 'pwd';

    setUsername(value) {
        this.username = value;
    };

    setPassword(value) {
        this.password = value;
    };

    login = () => {
        this.loginService.login(this.username, this.password);
    };
}

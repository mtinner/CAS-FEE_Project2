import {Component, Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {InputFieldComponent} from "../../elements/inputField/input-field.component";


@Injectable()
@Component({
    templateUrl: 'frontend/components/pages/login/login.component.html',
    styleUrls: ['frontend/components/pages/login/login.component.css'],
    directives: [InputFieldComponent]
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

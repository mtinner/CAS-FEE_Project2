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
    private inputField: Object = {username: {placeholder: 'Username', type: 'text'}};

    constructor(private loginService: LoginService) {
    }

    username = 'admin';
    password = 'pwd';

    setUsername = (event) => {
        this.username = event.target.value;
    };

    setPassword = (event) => {
        this.password = event.target.value;
    };

    login = () => {
        this.loginService.login(this.username, this.password);
    };

    logout = () => {
        this.loginService.logout();
    };
}

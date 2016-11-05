import {Component, Injectable} from '@angular/core';
import {LoginHttpService} from './login-http.service';
import {InputField} from '../../elements/inputField/InputField';


@Injectable()
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public emailInputField: InputField = new InputField('Email', 'email');
    public passwordInputField: InputField = new InputField('Password', 'password');


    constructor(private loginService: LoginHttpService) {
    }

    email = 'appUser@admin.ch';
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

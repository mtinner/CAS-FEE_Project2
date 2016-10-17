import {Component, Injectable} from '@angular/core';
import {RegisterService} from './register.service';
import {User} from '../../../models/User';
import {LoginHttpService} from '../login/login-http.service';


@Injectable()
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {
    private inputField: Object = {
        username: {placeholder: 'Username', type: 'text'},
        email: {placeholder: 'Email', type: 'email'},
        password: {placeholder: 'Password', type: 'password'}
    };
    private username: String;
    private email: String;
    private password: String;

    constructor(private loginService: LoginHttpService, private registerService: RegisterService) {
    }

    setUsername(value) {
        this.username = value;
    };

    setEmail(value) {
        this.email = value;
    };

    setPassword(value) {
        this.password = value;
    };

    register = () => {
        this.registerService.register({email: this.email, username: this.username, password: this.password})
            .subscribe((user: User) =>
                this.loginService.login(user.email, user.password)
            );
    };
}

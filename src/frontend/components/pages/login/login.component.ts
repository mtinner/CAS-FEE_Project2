import {Component, Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";


@Injectable()
@Component({
    templateUrl: 'frontend/components/pages/login/login.component.html',
    styleUrls: ['frontend/components/pages/login/login.component.css']
})
export class LoginComponent {
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

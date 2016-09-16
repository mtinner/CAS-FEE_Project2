import {Component, Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {LoginService} from "./login.service";


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
    response = '';

    setUsername = (event) => {
        this.username = event.target.value;
    };

    setPassword = (event) => {
        this.password = event.target.value;
    };

    login = () => {
        this.loginService.login(this.username, this.password, (res: Response) => {
            const token = res.headers.get('X-Auth-Token');
            this.response = token;
        });
    };

    logout = () => {
        this.loginService.logout();
    };

    test = () => {
        this.loginService.get('/api/auth/test', (res: Response) => {
            this.response = JSON.stringify(res.json());
        });
    };
}

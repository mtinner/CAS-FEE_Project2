import {Component, Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {ApiService} from '../../services/api.service';


@Injectable()
@Component({
    selector: 'login',
    templateUrl: 'frontend/components/login/login.component.html',
    styleUrls: ['frontend/components/login/login.component.css']
})
export class LoginComponent {
    constructor(private api: ApiService) {
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
        this.api.login(this.username, this.password, (res: Response) => {
            const token = res.headers.get('X-Auth-Token');
            this.response = token;
        });
    };

    logout = () => {
        this.api.logout();
    };

    test = () => {
        this.api.get('/api/auth/test', (res: Response) => {
            this.response = JSON.stringify(res.json());
        });
    };
}
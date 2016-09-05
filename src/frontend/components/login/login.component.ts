import {Component, Injectable} from '@angular/core';
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
        this.api.login(this.username, this.password, (res) => {
            const token = res.headers.get('X-Auth-Token');
            console.log(token);
            this.response = token;
        });
    };

    logout = () => {
        this.api.logout();
    };

    test = () => {
        this.api.get('/api/auth/test', (res) => {
            this.response = JSON.stringify(res.json());
        });
    };
}

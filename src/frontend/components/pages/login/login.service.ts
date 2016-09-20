import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable
// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators we need for THIS app.
// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";
import {AppService} from "../../app.service";

const JWT_RESPONSE_HEADER = 'X-Auth-Token';

@Injectable()
export class LoginService extends AppService {
    isLoggedIn = false;
    redirectUrl: string;

    constructor(private http: Http, private router: Router) {
        super();
        this.isLoggedIn = !!localStorage.getItem(JWT_RESPONSE_HEADER);
    }

    login(username, password) {
        const url = `/api/auth/token?username=${username}&password=${password}`;
        return this.http.get(url, {headers: LoginService.createHeaders()})
            .catch(this.handleError)
            .subscribe((res: Response) => {
                const token = res.headers.get(JWT_RESPONSE_HEADER);
                if (token) {
                    localStorage.setItem(JWT_RESPONSE_HEADER, token);
                    this.isLoggedIn = true;
                    if (this.redirectUrl) {
                        this.router.navigate([this.redirectUrl]);
                    }
                    else {
                        this.router.navigate(['shopping-list']);
                    }
                }
            });
    }

    logout() {
        localStorage.removeItem(JWT_RESPONSE_HEADER);
        this.isLoggedIn = false;
        this.router.navigate(['login']);
    }

    private static createHeaders() {
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        return new Headers(token ? {'Authorization': `Bearer ${token}`} : null);
    }
}

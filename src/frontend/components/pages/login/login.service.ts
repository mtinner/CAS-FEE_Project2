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

const JWT_RESPONSE_HEADER = 'X-Auth-Token';

@Injectable()
export class LoginService {
    isLoggedIn = false;
    redirectUrl: string;

    constructor(private http: Http, private router: Router) {
        this.isLoggedIn = !!localStorage.getItem(JWT_RESPONSE_HEADER);
    }

    //Todo refactoring https://angular.io/docs/ts/latest/guide/server-communication.html#!#fetch-data and use app.service.ts
    login(username, password, callback: (response: Response) => void) {
        this.get(`/api/auth/token?username=${username}&password=${password}`, callback);
    }

    get(url, callback: (response: Response) => void) {
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
                callback && callback(res);
            });
    }

    logout() {
        localStorage.removeItem(JWT_RESPONSE_HEADER);
        this.isLoggedIn = false;
    }

    private handleError = (error: any) => {
        const errMsg = error.message
            ? error.message : error.status
            ? `${error.status} - ${error.statusText}` : 'Server error';
        alert(errMsg);
        return Observable.throw(errMsg);
    };

    private static createHeaders() {
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        return new Headers(token ? {'Authorization': `Bearer ${token}`} : null);
    }
}

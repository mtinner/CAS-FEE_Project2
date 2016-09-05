import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
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

const JWT_RESPONSE_HEADER = 'X-Auth-Token';

@Injectable()
export class ApiService {

    constructor(private http: Http) {
    }

    get(url, callback: (result) => void) {
        return this.http.get(url, {headers: ApiService.createHeaders()})
            .catch(this.handleError)
            .subscribe((res) => {
                const token = res.headers.get(JWT_RESPONSE_HEADER);
                if (token) {
                    localStorage.setItem(JWT_RESPONSE_HEADER, token);
                    console.log('saved new token to storage');
                }
                callback && callback(res);
            });
    }

    logout() {
        localStorage.removeItem(JWT_RESPONSE_HEADER);
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
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

@Injectable()
export class ApiService {
    constructor(private http: Http) {
    }

    get(url, callback: (result) => void) {
        return this.http
            .get(url, {headers: ApiService.createHeaders()})
            .catch(this.handleError)
            .subscribe((res) => {
                const token = res.headers.get('X-Auth-Token');
                if (token) {
                    localStorage.setItem('X-Auth-Token', token);
                    console.log('saved new token to storage');
                }
                callback && callback(res);
            });
    }

    private handleError = (error: any) => {
        const errMsg = error.message
            ? error.message : error.status
            ? `${error.status} - ${error.statusText}` : 'Server error';
        alert(errMsg);
        return Observable.throw(errMsg);
    };

    private static createHeaders() {
        const token = localStorage.getItem('X-Auth-Token');
        return new Headers(token ? ['Authorization', `Bearer ${token}`] : null);
    }
}
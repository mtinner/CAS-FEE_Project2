import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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
@Component({
    selector: 'login',
    templateUrl: 'frontend/components/login/login.component.html',
    styleUrls: ['frontend/components/login/login.component.css']
})
export class LoginComponent {
    constructor(private http: Http) {
    }

    username = 'admin';
    password = 'pwd';
    response = '';

    login() {
        this.http
            .get(`/api/auth/token?username=${this.username}&password=${this.password}`)
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe((value: any) => {
                console.log(value);
                this.response = value.token;
            });
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        alert(errMsg); // log to console instead
    }

    private extractData(res: Response) {
        return res.json();
    }
}

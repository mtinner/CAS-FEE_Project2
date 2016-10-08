import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {AppService} from '../../app.service';

@Injectable()
export class RegisterService extends AppService {
    isLoggedIn = false;
    redirectUrl: string;

    constructor(private http: Http) {
        super();
    }

    register(user) {
        const url = `/api/register`;
        return this.http.post(url, user)
            .map(this.extractData)
            .catch(this.handleError);
    }
}

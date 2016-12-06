import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {AppService} from '../../app.service';

@Injectable()
export class RegisterService extends AppService {

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

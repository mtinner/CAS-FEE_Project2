import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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
import {JWT_RESPONSE_HEADER} from '../../common/authentication/auth-http.service';
import {LoginManagingService} from './login-managing.service';

// Reason for Servicesplitting -> Http: in NgModule AppModule
@Injectable()
export class LoginHttpService extends AppService {

    constructor(private http: Http, private loginManagingService: LoginManagingService) {
        super();
    }

    login(email, password) {
        const url = `/api/auth/token?email=${email}&password=${password}`;
        return this.http.get(url, {headers: this.loginManagingService.createHeaders()})
            .catch(this.handleError)
            .subscribe((res: Response) => {
                const token = res.headers.get(JWT_RESPONSE_HEADER);
                if (token) {
                    this.loginManagingService.setToken(token);
                    this.loginManagingService.performRedirect();
                }
            });
    }
}

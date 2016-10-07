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
import {Router} from '@angular/router';
import {AppService} from '../../app.service';
import {JWT_RESPONSE_HEADER} from '../../common/authentication/auth-http.service';

@Injectable()
export class LoginService extends AppService {
    isLoggedIn = false;
    redirectUrl: string;

    constructor(private http: Http, private router: Router) {
        super();
        this.isLoggedIn = !!localStorage.getItem(JWT_RESPONSE_HEADER);
    }

    login(email, password) {
        const url = `/api/auth/token?email=${email}&password=${password}`;
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
                        this.router.navigate(['']);
                    }
                }
            });
    }

    logout() {
        localStorage.removeItem(JWT_RESPONSE_HEADER);
        this.isLoggedIn = false;
    }

    private static createHeaders() {
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        return new Headers(token ? {'Authorization': `Bearer ${token}`} : null);
    }
}

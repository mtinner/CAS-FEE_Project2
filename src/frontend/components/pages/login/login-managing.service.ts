import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';
import {JWT_RESPONSE_HEADER} from '../../common/authentication/auth-http.service';
import {SnackbarService} from '../../elements/snackbar/snackbar.service';

// Reason for Servicesplitting -> Http: in NgModule AppModule
@Injectable()
export class LoginManagingService {
    redirectUrl: string;

    constructor(private router: Router, private snackbarService: SnackbarService) {
    }

    logout() {
        localStorage.removeItem(JWT_RESPONSE_HEADER);
    }

    performNotAuthorized() {
        if (this.router.url.includes('login')) {
            this.snackbarService.showSnackbar('Wrong email or password');
            return;
        }
        this.redirectUrl = this.router.url;
        this.logout();
        this.router.navigate(['/login']);
    }

    performRedirect() {
        if (this.redirectUrl && !this.redirectUrl.includes('login')) {
            this.router.navigate([this.redirectUrl]);
        }
        else {
            this.router.navigate(['']);
        }
    }

    setToken(token) {
        if (token) {
            localStorage.setItem(JWT_RESPONSE_HEADER, token);
        }
    }

    getToken() {
        return localStorage.getItem(JWT_RESPONSE_HEADER);
    }

    isLoggedIn() {
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        return !!token;
    }

    createHeaders() {
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        return new Headers(token ? {'Authorization': `Bearer ${token}`} : null);
    }
}

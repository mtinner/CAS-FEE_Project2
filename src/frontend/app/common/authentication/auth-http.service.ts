import {
    Http, Headers, ConnectionBackend, Response,
    RequestOptionsArgs, RequestOptions
} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginManagingService} from '../../pages/login/login-managing.service';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {SnackbarService} from '../../elements/snackbar/snackbar.service';

export const JWT_RESPONSE_HEADER = 'X-Auth-Token';

@Injectable()
export class AuthHttp extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private loginManagingService: LoginManagingService, private snackbarService: SnackbarService) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.get(url, this.appendAuthHeader(options))
            .map(this.saveToken);
        return this.interceptResponse(request);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.post(url, body, this.appendAuthHeader(options))
            .map(this.saveToken);
        return this.interceptResponse(request);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.put(url, body, this.appendAuthHeader(options))
            .map(this.saveToken);
        return this.interceptResponse(request);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.delete(url, this.appendAuthHeader(options))
            .map(this.saveToken);
        return this.interceptResponse(request);
    }

    private appendAuthHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
        let mergedOptions: RequestOptionsArgs;
        if (!options) {
            mergedOptions = {headers: new Headers()};
        } else {
            mergedOptions = options;
        }
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        const isTokenSet = mergedOptions.headers.has('Authorization');
        if (token && !isTokenSet && this.loginManagingService.isLoggedIn()) {
            mergedOptions.headers.append('Authorization', `Bearer ${token}`);
        }
        return mergedOptions;
    }

    saveToken = (res: Response): Response => {
        const token = this.loginManagingService.getToken();
        if (token) {
            this.loginManagingService.setToken(token);
            localStorage.setItem(JWT_RESPONSE_HEADER, token);
        }
        return res;
    };

    interceptResponse(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err) => {
            if (err.status === 401) {
                this.loginManagingService.performNotAuthorized();
                return new EmptyObservable();
            }
            else if (err.status !== 422 && err.status !== 403) {
                let message = 'Something went wrong';
                this.snackbarService.showSnackbar(message);
            }
            return Observable.throw(err);
        });
    }
}
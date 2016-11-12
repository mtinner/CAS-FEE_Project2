import {Http, XHRBackend, RequestOptions} from '@angular/http';
import {AuthHttp} from './auth-http.service';
import {LoginManagingService} from '../../pages/login/login-managing.service';
import {SnackbarService} from '../../elements/snackbar/snackbar.service';

// no arrow expression --> AOT compiling (https://github.com/angular/angular/issues/11262)
export function authServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, loginManaginService: LoginManagingService, snackbarService: SnackbarService) {
    return new AuthHttp(backend, defaultOptions, loginManaginService, snackbarService);
};

export let authServiceProvider = {
    provide: Http,
    useFactory: authServiceFactory,
    deps: [XHRBackend, RequestOptions, LoginManagingService, SnackbarService]
};

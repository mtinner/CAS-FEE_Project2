import {Http, XHRBackend, RequestOptions} from '@angular/http';
import {AuthHttp} from './auth-http.service';
import {LoginManagingService} from '../../pages/login/login-managing.service';


let authServiceFactory = (backend: XHRBackend, defaultOptions: RequestOptions, loginManaginService: LoginManagingService) => {
    return new AuthHttp(backend, defaultOptions, loginManaginService);
};

export let authServiceProvider = {
    provide: Http,
    useFactory: authServiceFactory,
    deps: [XHRBackend, RequestOptions, LoginManagingService]
};

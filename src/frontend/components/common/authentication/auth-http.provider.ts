import {Http, XHRBackend, RequestOptions} from '@angular/http';
import {AuthHttp} from './auth-http.service';


let authServiceFactory = (backend: XHRBackend, defaultOptions: RequestOptions) => {
    return new AuthHttp(backend, defaultOptions);
};

export let authServiceProvider = {
    provide: Http,
    useFactory: authServiceFactory,
    deps: [XHRBackend, RequestOptions]
};

import {Response}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';

export abstract class AppService {

    baseUrl: string = 'api/';

    extractData(res: Response): { } {
        let body = res.json();
        return body || {};
    }

    handleError(error: any): Observable<any> {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

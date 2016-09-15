import {Response,Headers, RequestOptions}        from '@angular/http';
import {Observable}     from 'rxjs/Observable';

export abstract class AppService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    protected jsonOptions = new RequestOptions({ headers: this.headers });
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

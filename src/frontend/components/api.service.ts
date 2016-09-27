import {
  Http, Headers, ConnectionBackend, Response,
  RequestOptionsArgs, Request, RequestOptions
} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export const JWT_RESPONSE_HEADER = 'X-Auth-Token';

@Injectable()
export class ApiClient extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, this.appendAuthHeader(options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.appendAuthHeader(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.appendAuthHeader(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.appendAuthHeader(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.appendAuthHeader(options));
  }

  private appendAuthHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
    let mergedOptions: RequestOptionsArgs;
    if (!options) {
      mergedOptions = { headers: new Headers() };
    } else {
      mergedOptions = options;
    }
    const token = localStorage.getItem(JWT_RESPONSE_HEADER);
    if (token) mergedOptions.headers.append('Authorization', `Bearer ${token}`);
    return mergedOptions;
  }
}
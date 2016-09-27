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
    this.appendAuthHeader(options);
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.appendAuthHeader(options);
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.appendAuthHeader(options);
    return super.post(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.appendAuthHeader(options);
    return super.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.appendAuthHeader(options);
    return super.delete(url, options);
  }

  private appendAuthHeader(options?: RequestOptionsArgs) {
    if (!options) return;
    const token = localStorage.getItem(JWT_RESPONSE_HEADER);
    if (token) options.headers.append('Authorization', `Bearer ${token}`);
  }
}
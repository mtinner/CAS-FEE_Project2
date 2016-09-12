import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";
import {AppService} from "../app.service";

@Injectable()
export class ShoppingListService extends AppService {

    constructor(private http: Http) {
        super();
    }

    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    fetchGroupItems(): Observable<any> {
        return this.http.get(`${this.shoppingListUrl}/groups`)
            .map(this.extractData)
            .catch(this.handleError)
    }

    fetchArticles(): Observable<any> {
        console.log('asdfasdfasd');
        return this.http.get(`${this.shoppingListUrl}/article`)
            .map(this.extractData)
            .catch(this.handleError);
    }
}

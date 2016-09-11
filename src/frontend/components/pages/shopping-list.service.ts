import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";
import {Group} from "../../models/Group";
import {AppService} from "../app.service";

@Injectable()
export class ShoppingListService extends AppService {

    constructor(private http: Http) {
        super();
    }

    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    getGroupItems(): Observable<any> {
        return this.http.get(`${this.shoppingListUrl}/groups`)
            .map(this.extractData)
            .catch(this.handleError);
    }
}

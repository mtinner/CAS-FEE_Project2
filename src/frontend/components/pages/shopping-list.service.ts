import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";
import {AppService} from "../app.service";

@Injectable()
export class ShoppingListService extends AppService {
    private groupObserver;
    private groupObj: any = {};
    private articleObj: any = {};
    private articleObserver;
    public groups$: Observable<any> = new Observable(observer=> {
        this.groupObserver = observer;
    });

    public articles$: Observable<any> = new Observable(observer=> {
        this.articleObserver = observer;
    });

    constructor(private http: Http) {
        super();
    }

    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    fetchGroupItems(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/groups`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe(groupObj => {
            this.groupObj = groupObj;
            this.groupObserver.next(groupObj);
        });

        return response;
    }

    fetchArticles(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/article`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe(articleObj => {
            this.articleObj = articleObj;
            this.articleObserver.next(articleObj);
        });
        return response;
    }
}

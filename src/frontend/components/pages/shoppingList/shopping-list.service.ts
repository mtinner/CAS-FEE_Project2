import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from "@angular/http";
import {AppService} from "../../app.service";
import {Article} from "../../../models/Article";

@Injectable()
export class ShoppingListService extends AppService {
    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    private groupObserver;
    private groupObj: any = {groups: []};
    private articleObj: any = {articles: []};
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

    deleteArticle(id): Observable<any> {
        let response = this.http.delete(`${this.shoppingListUrl}/article/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((deletedArticle: Article) => {
            this.articleObj.articles = this.articleObj.articles.filter(article=>
                deletedArticle.id !== article.id
            );
            this.articleObserver.next(this.articleObj);
        });

        return response;
    }

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

    addArticle(body):Observable<any> {
        let response = this.http.post(`${this.shoppingListUrl}/article`,body,this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((article: Article) => {
            this.articleObj.articles.push(article);
            this.articleObserver.next(this.articleObj);
        });
        return response;
    }
}

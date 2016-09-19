import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {AppService} from '../../app.service';
import {Article, ArticleObj} from '../../../models/Article';
import {GroupObj} from '../../../models/Group';

@Injectable()
export class ShoppingListService extends AppService {
    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    private groupObserver;
    private groupObj: GroupObj = new GroupObj([]);
    private articleObj: ArticleObj = new ArticleObj([]);
    private articleObserver;
    public groups$: Observable<any> = new Observable(observer => {
        this.groupObserver = observer;
    });

    public articles$: Observable<any> = new Observable(observer => {
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
            this.articleObj.articles = this.articleObj.articles.filter(article =>
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
         response.subscribe((groupObj: GroupObj) => {
         this.groupObj = groupObj;
         this.groupObserver.next(groupObj);
         });

        return response;
    }

    fetchArticles(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/article`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((articleObj: ArticleObj) => {
            this.articleObj = articleObj;
            this.articleObserver.next(articleObj);
        });
        return response;
    }

    addArticle(body): Observable<any> {
        let response = this.http.post(`${this.shoppingListUrl}/article`, body, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((article: Article) => {
            this.articleObj.articles.push(article);
            this.articleObserver.next(this.articleObj);
        });
        return response;
    }
}

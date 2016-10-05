import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Article, ArticleObj} from '../../../../models/Article';
import {GroupObj, Group} from '../../../../models/Group';

@Injectable()
export class ShoppingListService extends AppService {
    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    public groups: Group[] = [];
    public articles: Article[] = [];

    constructor(private http: Http) {
        super();
    }

    deleteArticle(id): Observable<any> {
        let response = this.http.delete(`${this.shoppingListUrl}/article/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((deletedArticle: Article) => {
            this.articles = this.articles.filter(article =>
                deletedArticle.id !== article.id
            );
        });

        return response;
    }

    fetchGroupItems(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/groups`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((groupObj: GroupObj) => {
            this.groups = groupObj.groups;
        });

        return response;
    }

    fetchArticles(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/article`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((articleObj: ArticleObj) => {
            this.articles = articleObj.articles;
        });
        return response;
    }

    addArticle(body): Observable<any> {
        let response = this.http.post(`${this.shoppingListUrl}/article`, body, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((article: Article) => {
           this.articles.push(article);
        });
        return response;
    }
}

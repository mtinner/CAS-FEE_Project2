import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import {AppService} from '../../app.service';
import {Article, ArticleObj} from '../../../models/Article';
import {GroupObj, Group} from '../../../models/Group';

@Injectable()
export class ShoppingListService extends AppService {
    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    private groups: Group[] = [];
    private articles: Article[] = [];
    public groups$: Subject<Group[]>;
    public articles$: Subject<Article[]>;

    constructor(private http: Http) {
        super();
        this.groups$ = new BehaviorSubject<Group[]>(null);
        this.articles$ = new BehaviorSubject<Article[]>(null);
    }

    deleteArticle(id): Observable<any> {
        let response = this.http.delete(`${this.shoppingListUrl}/article/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((deletedArticle: Article) => {
            this.articles = this.articles.filter(article =>
                deletedArticle.id !== article.id
            );
            this.articles$.next(this.articles);
        });

        return response;
    }

    fetchGroupItems(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/groups`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((groupObj: GroupObj) => {
            this.groups = groupObj.groups;
            this.groups$.next(this.groups);
        });

        return response;
    }

    fetchArticles(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/article`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((articleObj: ArticleObj) => {
            this.articles = articleObj.articles;
            this.articles$.next(this.articles);
        });
        return response;
    }

    addArticle(body): Observable<any> {
        let response = this.http.post(`${this.shoppingListUrl}/article`, body, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((article: Article) => {
            this.articles.push(article);
            this.articles$.next(this.articles);
        });
        return response;
    }

    getArticlesForGroup(id: number): Article[] {
        if (id === 0) {
            return this.articles;
        }
        return this.articles.filter(article => {
                    return article.group === id;
                }
            ) || [];
    }
}

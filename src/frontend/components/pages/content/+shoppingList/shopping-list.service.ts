import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Article, ArticleObj} from '../../../../models/Article';
import {ArticleGroup, ArticleGroupObj} from '../../../../models/ArticleGroup';

@Injectable()
export class ShoppingListService extends AppService {
    private shoppingListUrl = `${this.baseUrl}shoppinglist`;

    public articleGroups: ArticleGroup[] = [];
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

    fetchArticleGroups(): Observable<any> {
        let response = this.http.get(`${this.shoppingListUrl}/article/groups`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((articleGroupObj: ArticleGroupObj) => {
            this.articleGroups = articleGroupObj.articleGroups;
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
            // create new reference to invoke pipe
            this.articles = this.articles.map(x=>x);
        });
        return response;
    }
}

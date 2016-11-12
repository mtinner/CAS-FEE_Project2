import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Article, ArticleObj} from '../../../../models/Article';
import {ArticleGroup, ArticleGroupObj} from '../../../../models/ArticleGroup';

@Injectable()
export class ShoppingListService extends AppService {
    private shoppingListUrl = `${this.baseUrl}articles`;

    public articleGroups: ArticleGroup[] = [];
    public articles: Article[] = [];

    constructor(private http: Http) {
        super();
    }

    deleteArticle(id): Observable<any> {
        return this.http.delete(`${this.shoppingListUrl}/${id}`)
            .map(this.extractData)
            .map((deletedArticle: Article) => {
                this.articles = this.articles.filter(article =>
                    deletedArticle.id !== article.id
                );
            })
            .catch(this.handleError);
    }

    fetchArticleGroups(): Observable<any> {
        return this.http.get(`${this.shoppingListUrl}/groups`)
            .map(this.extractData)
            .map((articleGroupObj: ArticleGroupObj) => this.articleGroups = articleGroupObj.articleGroups)
            .catch(this.handleError);
    }

    fetchArticles(): Observable<any> {
        return this.http.get(`${this.shoppingListUrl}`)
            .map(this.extractData)
            .map((articleObj: ArticleObj) => this.articles = articleObj.articles)
            .catch(this.handleError);
    }

    addArticle(body): Observable<any> {
        return this.http.post(`${this.shoppingListUrl}`, body, this.jsonOptions)
            .map(this.extractData)
            .map((article: Article) => {
                this.articles.push(article);
                // create new reference to invoke pipe
                this.articles = this.articles.map(x => x);
            })
            .catch(this.handleError);
    }
}

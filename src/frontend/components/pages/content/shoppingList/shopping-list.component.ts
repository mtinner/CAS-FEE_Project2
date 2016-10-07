import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {ArticleGroup} from '../../../../models/ArticleGroup';
import {Article} from '../../../../models/Article';

@Component({
    moduleId: module.id,
    templateUrl: 'shopping-list.component.html',
    styleUrls: ['shopping-list.component.css'],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
    private addText: string = 'Add article';

    constructor(private shoppingListService: ShoppingListService) {
    }

    deleteArticle(article: Article) {
        this.shoppingListService.deleteArticle(article.id);
    }

    addArticle(item: string, articleGroup: ArticleGroup) {
        this.shoppingListService.addArticle({name: item, articleGroup: articleGroup.id});
    }

    ngOnInit(): void {
        this.shoppingListService.fetchArticleGroups();

        this.shoppingListService.fetchArticles();
    }
}

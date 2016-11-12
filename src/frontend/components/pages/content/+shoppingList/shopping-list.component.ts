import {Component, OnInit, OnDestroy} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {ArticleGroup} from '../../../../models/ArticleGroup';
import {Article} from '../../../../models/Article';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';

@Component({
    moduleId: module.id,
    templateUrl: 'shopping-list.component.html',
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private addText: string = 'Add article';

    constructor(public shoppingListService: ShoppingListService, private headerService: HeaderService) {
    }

    deleteArticle(article: Article) {
        this.shoppingListService.deleteArticle(article.id);
    }

    addArticle(item: string, articleGroup: ArticleGroup) {
        this.shoppingListService.addArticle({name: item, articleGroup: articleGroup.id});
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Shopping List', HeaderStyle.ShoppingList);
        this.shoppingListService.fetchArticleGroups();

        this.shoppingListService.fetchArticles();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

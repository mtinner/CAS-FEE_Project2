import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Article} from '../../../models/Article';
import {HeaderService} from '../../elements/header/header.service';
import {ArticleGroup} from '../../../models/ArticleGroup';
import {HeaderStyle} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';

@Component({
    moduleId: module.id,
    templateUrl: 'shopping-list.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    constructor(public shoppingListService: ShoppingListService, private headerService: HeaderService) {
    }

    deleteArticle(article: Article) {
        this.shoppingListService.deleteArticle(article.id).subscribe();
    }

    addArticle(item: string, articleGroup: ArticleGroup) {
        this.shoppingListService.addArticle({name: item, articleGroup: articleGroup.id}).subscribe();
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Shopping List', HeaderStyle.ShoppingList);
        this.shoppingListService.fetchArticleGroups().subscribe();

        this.shoppingListService.fetchArticles().subscribe();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

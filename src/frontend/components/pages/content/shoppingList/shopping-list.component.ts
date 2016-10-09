import {Component, OnInit, OnDestroy} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {ArticleGroup} from '../../../../models/ArticleGroup';
import {Article} from '../../../../models/Article';
import {HeaderService} from '../../../elements/header/header.service';
import {Header} from '../../../elements/header/header.enum';

@Component({
    moduleId: module.id,
    templateUrl: 'shopping-list.component.html',
    styleUrls: ['shopping-list.component.css'],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private addText: string = 'Add article';

    constructor(private shoppingListService: ShoppingListService, private headerService: HeaderService) {
    }

    deleteArticle(article: Article) {
        this.shoppingListService.deleteArticle(article.id);
    }

    addArticle(item: string, articleGroup: ArticleGroup) {
        this.shoppingListService.addArticle({name: item, articleGroup: articleGroup.id});
    }

    ngOnInit(): void {
        this.headerService.headerConfig = {
            title: 'Shopping List',
            type: Header.ShoppingList
        };
        this.shoppingListService.fetchArticleGroups();

        this.shoppingListService.fetchArticles();
    }


    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

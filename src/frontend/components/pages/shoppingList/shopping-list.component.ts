import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Group} from '../../../models/Group';
import {Article} from '../../../models/Article';

@Component({
    templateUrl: 'frontend/components/pages/shoppingList/shopping-list.component.html',
    styleUrls: ['frontend/components/pages/shoppingList/shopping-list.component.css'],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
    private addText: string = 'Add article';

    constructor(private shoppingListService: ShoppingListService) {
    }

    deleteArticle(article: Article) {
        this.shoppingListService.deleteArticle(article.id);
    }

    addArticle(item: string, group: Group) {
        this.shoppingListService.addArticle({name: item, group: group.id});
    }

    ngOnInit(): void {
        this.shoppingListService.fetchGroupItems();

        this.shoppingListService.fetchArticles();
    }
}

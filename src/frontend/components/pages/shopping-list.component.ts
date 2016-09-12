import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Group} from "../../models/Group";
import {Article} from "../../models/Article";

@Component({
    templateUrl: 'frontend/components/pages/shopping-list.component.html',
    styleUrls: ['frontend/components/pages/shopping-list.component.css'],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
    private groups: Group[] = [];
    private articles: Article[] = [];

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit(): void {
        this.shoppingListService.fetchGroupItems()
            .subscribe(groupObj => this.groups = groupObj.groups);

        this.shoppingListService.fetchArticles()
            .subscribe(articleObj => this.articles = articleObj.articles);
    }
}

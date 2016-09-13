import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Group} from "../../models/Group";
import {Article} from "../../models/Article";
import {ChipComponent} from "../elements/chip/chip.component";
import {CardComponent} from "../elements/card/card.component";
import {AddComponent} from "../elements/add/add.component";

@Component({
    templateUrl: 'frontend/components/pages/shopping-list.component.html',
    styleUrls: ['frontend/components/pages/shopping-list.component.css'],
    providers: [ShoppingListService],
    directives: [CardComponent, ChipComponent, AddComponent]

})
export class ShoppingListComponent implements OnInit {
    private groups: Group[] = [];
    private articles: Article[] = [];
    private addText: string = 'Add article';


    constructor(private shoppingListService: ShoppingListService) {
    }

    getArticlesForGroup(id: number) {
        if (id === 0) {
            return this.articles;
        }
        return this.articles.filter(article => {
                    return article.group === id
                }
            ) || [];
    }

    ngOnInit(): void {
        this.shoppingListService.fetchGroupItems()
            .subscribe(groupObj => this.groups = groupObj.groups);

        this.shoppingListService.fetchArticles()
            .subscribe(articleObj => this.articles = articleObj.articles);
    }
}

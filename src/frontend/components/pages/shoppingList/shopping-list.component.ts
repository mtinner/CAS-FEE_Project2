import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Group} from "../../../models/Group";
import {Article} from "../../../models/Article";
import {ChipComponent} from "../../elements/chip/chip.component";
import {CardComponent} from "../../elements/card/card.component";
import {AddComponent} from "../../elements/add/add.component";

@Component({
    templateUrl: 'frontend/components/pages/shoppingList/shopping-list.component.html',
    styleUrls: ['frontend/components/pages/shoppingList/shopping-list.component.css'],
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

    deleteArticle(article) {
        this.shoppingListService.deleteArticle(article.id)
    }

    addArticle(item, group) {
        this.shoppingListService.addArticle({name: item, group: group.id});
    }

    ngOnInit(): void {
        this.shoppingListService.fetchGroupItems();
        this.shoppingListService.groups$.subscribe(groupsObj=> {
            this.groups = groupsObj.groups;
        });

        this.shoppingListService.fetchArticles();
        this.shoppingListService.articles$.subscribe(articleObj=> {
            this.articles = articleObj.articles;
        });
    }
}

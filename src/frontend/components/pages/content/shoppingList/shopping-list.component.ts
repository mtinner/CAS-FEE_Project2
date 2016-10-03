import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Group} from '../../../../models/Group';
import {Article} from '../../../../models/Article';


@Component({
    moduleId: module.id,
    templateUrl: 'shopping-list.component.html',
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
    private groups: Group[] = [];
    private articles: Article[] = [];
    private addText: string = 'Add article';


    constructor(private shoppingListService: ShoppingListService) {
    }

    getArticlesForGroup(id: number): Article[] {
        if (id === 0) {
            return this.articles;
        }
        return this.articles.filter(article => {
                    return article.group === id;
                }
            ) || [];
    }

    deleteArticle(article: Article) {
        this.shoppingListService.deleteArticle(article.id);
    }

    addArticle(item: string, group: Group) {
        this.shoppingListService.addArticle({name: item, group: group.id});
    }

    ngOnInit(): void {
        this.shoppingListService.fetchGroupItems();
        this.shoppingListService.groups$.subscribe(groupsObj => {
            this.groups = groupsObj.groups;
        });

        this.shoppingListService.fetchArticles();
        this.shoppingListService.articles$.subscribe(articleObj => {
            this.articles = articleObj.articles;
        });
    }
}

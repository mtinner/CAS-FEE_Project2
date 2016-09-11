import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Group} from "../../models/Group";

@Component({
    templateUrl: 'frontend/components/pages/shopping-list.component.html',
    styleUrls: ['frontend/components/pages/shopping-list.component.css'],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
    private groups: Group[] = [];

    constructor(private shoppingListService: ShoppingListService) {
        //  this.groups = [{name: 'Alle'}, {name: 'Früchte/Gemüse'}, {name: 'Fleisch'}, {name: 'Food'}, {name: 'Non Food'}];
    }

    ngOnInit(): void {
        this.shoppingListService.getGroupItems()
            .subscribe(groups => this.groups = groups);
    }
}

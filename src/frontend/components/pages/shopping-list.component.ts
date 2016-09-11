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
    }

    ngOnInit(): void {
        this.shoppingListService.getGroupItems()
            .subscribe(groupObj => this.groups = groupObj.groups);
    }
}

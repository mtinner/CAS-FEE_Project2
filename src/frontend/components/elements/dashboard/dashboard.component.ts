import {Component} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {CardComponent} from "../card/card.component";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'frontend/components/elements/dashboard/dashboard.component.html',
    styleUrls: ['frontend/components/elements/dashboard/dashboard.component.css'],
    providers: [DashboardService],
    directives: [CardComponent]
})
export class DashboardComponent {

    private showNavigation = true;
    private menuItems: string[] = [];
    private selectedIndex: number = 0;

    constructor(private dashboardService: DashboardService) {
        this.menuItems = dashboardService.getMenuItems();
    }

    toggleNavigation() {
        this.showNavigation = !this.showNavigation;
    }

    setSelectedIndex(index) {
        this.selectedIndex = index;
    }
}

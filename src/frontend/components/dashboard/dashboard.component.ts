import {Component} from '@angular/core';
import {DashboardService} from "./dashboard.service";


@Component({
    selector: 'my-dashboard',
    templateUrl: 'frontend/components/dashboard/dashboard.component.html',
    styleUrls: ['frontend/components/dashboard/dashboard.component.css'],
    providers: [DashboardService]
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

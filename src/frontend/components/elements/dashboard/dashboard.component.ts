import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {CardComponent} from '../card/card.component';
import {Router} from '@angular/router';


@Component({
    selector: 'my-dashboard',
    templateUrl: 'frontend/components/elements/dashboard/dashboard.component.html',
    styleUrls: ['frontend/components/elements/dashboard/dashboard.component.css'],
    providers: [DashboardService],
    directives: [CardComponent]
})
export class DashboardComponent implements OnInit {

    private showNavigation = true;
    private menuItems: Array<any> = [];
    private selectedIndex: number = 0;

    constructor(private router: Router, dashboardService: DashboardService) {
        this.menuItems = dashboardService.getMenuItems();
    }

    toggleNavigation() {
        this.showNavigation = !this.showNavigation;
    }

    ngOnInit(): void {
        this.determineActiveRoute();
    }

    determineActiveRoute() {
        this.router.events.subscribe((val) => {
            let index = this.menuItems.findIndex(menuItem =>
                val.url === menuItem.route
            );
            this.selectedIndex = index < 0 ? 0 : index;
        });
    }
}

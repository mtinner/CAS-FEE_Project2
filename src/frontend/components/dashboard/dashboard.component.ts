import {Component} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {Router} from '@angular/router';


@Component({
	selector: 'my-dashboard',
	templateUrl: 'frontend/components/dashboard/dashboard.component.html',
	styleUrls: ['frontend/components/dashboard/dashboard.component.css'],
	providers: [DashboardService]
})
export class DashboardComponent {

	private showNavigation = true;
	private menuItems = [];
	private selectedIndex: number = 0;

	constructor(private dashboardService: DashboardService, private router: Router) {
		this.menuItems = dashboardService.getMenuItems();
		router.events.subscribe((val) => this.selectedIndex = this.menuItems.findIndex(menuItem=>val.url === menuItem.route) || 0);
	}

	toggleNavigation() {
		this.showNavigation = !this.showNavigation;
	}
}

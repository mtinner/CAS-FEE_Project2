import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import {LoginService} from '../../pages/login/login.service';
import {MenuItem} from '../../../models/MenuItem';


@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    private showNavigation = false;
    private menuItems: Array<any> = [];
    private selectedIndex: number = 0;

    constructor(private router: Router, dashboardService: DashboardService, private loginService: LoginService) {
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

    itemClicked(item: MenuItem) {
        this.toggleNavigation();
        if (item.name.toLocaleLowerCase().includes('logout')) {
            this.logout();
        }
    }

    logout() {
        this.loginService.logout();
    }
}

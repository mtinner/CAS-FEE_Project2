import {Component, OnInit} from '@angular/core';
import {SideNavService} from './sidenav.service';
import {Router} from '@angular/router';
import {LoginManagingService} from '../../pages/login/login-managing.service';
import {MenuItem} from '../../../models/MenuItem';

@Component({
    moduleId: module.id,
    selector: 'sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css'],
    providers: [SideNavService]
})
export class SideNavComponent implements OnInit {

    private showNavigation = false;
    private menuItems: Array<any> = [];
    private selectedIndex: number = 0;

    constructor(private router: Router, sideNavService: SideNavService, private loginManaginService: LoginManagingService) {
        this.menuItems = sideNavService.getMenuItems();
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
        this.loginManaginService.logout();
    }
}

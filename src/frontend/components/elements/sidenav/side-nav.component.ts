import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginManagingService} from '../../pages/login/login-managing.service';
import {MenuItem} from '../../../models/MenuItem';
import {SideNavService} from './side-nav.service';

@Component({
    moduleId: module.id,
    selector: 'side-nav',
    templateUrl: 'side-nav.component.html',
    styleUrls: ['side-nav.component.css']
})
export class SideNavComponent implements OnInit {

    public menuItems: Array<any> = [];
    private selectedIndex: number = 0;

    constructor(private router: Router, public sideNavService: SideNavService, private loginManagingService: LoginManagingService) {
        this.menuItems = sideNavService.getMenuItems();
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
        this.sideNavService.toggleNavigation();
        if (item.name.toLocaleLowerCase().includes('logout')) {
            this.logout();
        }
    }

    logout() {
        this.loginManagingService.logout();
    }
}

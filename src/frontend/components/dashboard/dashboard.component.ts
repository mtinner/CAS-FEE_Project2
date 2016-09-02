import {Component} from '@angular/core';


@Component({
    selector: 'my-dashboard',
    templateUrl: 'frontend/components/dashboard/dashboard.component.html',
    styleUrls: ['frontend/components/dashboard/dashboard.component.css']
})
export class DashboardComponent {

    private menuItems = [
        {name: 'Shopping List', icon: 'shopping-list', route: '/shopping-list'},
        {name: 'Costs', icon: 'cost', route: '/cost-management'},
        {name: 'Account', icon: 'user'}
    ];
    private showNavigation = true;

    constructor() {
    }

    toggleNavigation() {
        this.showNavigation = !this.showNavigation;
    }

    goTo(item) {
        console.log(item);
    }
}

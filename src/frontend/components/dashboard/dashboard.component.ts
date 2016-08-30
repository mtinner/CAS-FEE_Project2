import {Component} from '@angular/core';
import {LoginComponent} from '../login/login.component'


@Component({
    selector: 'my-dashboard',
    templateUrl: 'frontend/components/dashboard/dashboard.component.html',
    styleUrls: ['frontend/components/dashboard/dashboard.component.css'],
    directives: [LoginComponent]
})
export class DashboardComponent {

    private menuItems = [
        {name: 'Shopping List', icon: 'shopping-list'},
        {name: 'Costs', icon: 'cost'},
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

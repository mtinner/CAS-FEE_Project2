import {Component} from '@angular/core';


@Component({
    selector: 'my-dashboard',
    templateUrl: 'frontend/components/dashboard/dashboard.component.html',
    styleUrls: ['frontend/components/dashboard/dashboard.component.css']
})
export class DashboardComponent {

    private menuItems = [
        {name: 'Shopping List', icon: 'shopping-list'},
        {name: 'Costs', icon: 'cost'},
        {name: 'Account', icon: 'user'}
    ];
    private showNavigation = false;

    constructor() {
    }

    slideNavigation() {
        this.showNavigation = true;
    }

    hideNavigation() {
        this.showNavigation = false;
    }

    goTo(item) {
        console.log(item);
        this.hideNavigation();
    }
}

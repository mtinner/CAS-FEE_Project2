import {Component} from '@angular/core';
import {Router} from '@angular/router';


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

    constructor(private router:Router) {
    }
}

import {Injectable} from '@angular/core';

@Injectable()
export class DashboardService {

    private menuItems = [
        {name: 'Shopping List', icon: 'shopping-list', route: '/shopping-list'},
        {name: 'Cost Management', icon: 'cost-management', route: '/cost-management'},
        {name: 'Auth', icon: 'settings', route: '/login'},
        {name: 'Settings', icon: 'settings', route: '/settings'}
    ];

    getMenuItems(): Array<any> {
        return this.menuItems;
    }
}

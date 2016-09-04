import {Injectable} from '@angular/core';

@Injectable()
export class DashboardService {

    private menuItems = [
        {name: 'Shopping List', icon: 'shopping-list', route: '/shopping-list'},
        {name: 'Cost Management', icon: 'cost', route: '/cost-management'},
        {name: 'Settings', icon: 'user'}
    ];

    getMenuItems(): Array<any> {
        return this.menuItems;
    }
}

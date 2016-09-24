import {Injectable} from '@angular/core';
import {MenuItem} from "../../../models/MenuItem";

@Injectable()
export class DashboardService {

    private menuItems: MenuItem[] = [
        new MenuItem('Shopping List', 'shopping-list', '/shopping-list'),
        new MenuItem('Cost Management', 'cost-management', '/cost-management'),
        new MenuItem('Auth', '', '/login'),
        new MenuItem('Settings', 'settings', '/settings'),
        new MenuItem('Logout', 'logout', '/login')
    ];

    getMenuItems(): Array<any> {
        return this.menuItems;
    }
}

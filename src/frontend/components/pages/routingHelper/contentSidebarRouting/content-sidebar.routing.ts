import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentSidebarComponent} from './content-sidebar.component';
import {AuthGuard} from '../../login/auth-guard.service';
import {costManagementRoute} from '../../costManagement/cost-management.routing';
import {shoppingListRoute} from '../../shoppingList/shopping-list.route';
import {settingsRoute} from '../../settings/settings.route';

const contentSidebarRoutes: Routes = [
    {
        path: '',
        component: ContentSidebarComponent,
        canActivate: [AuthGuard],
        children: [
            shoppingListRoute,
            costManagementRoute,
            settingsRoute
        ]
    }
];

export const contentSidebarRouting: ModuleWithProviders = RouterModule.forChild(contentSidebarRoutes);

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../login/auth-guard.service';
import {shoppingListRoute} from './+shoppingList/shopping-list.routing';
import {costManagementRoute} from './+costManagement/cost-management.routing';
import {settingsRoutes} from './settings/settings.routing';

const contentRoutes: Routes = [
    {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            {path: '', redirectTo: '/shopping-list', pathMatch: 'full'},
            shoppingListRoute,
            costManagementRoute,
            ...settingsRoutes,
        ]
    }

];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);
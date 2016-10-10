import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../login/auth-guard.service';
import {shoppingListRoutes} from './+shoppingList/shopping-list.routing';
import {costManagementRoutes} from './+costManagement/cost-management.routing';
import {settingsRoutes} from './settings/settings.routing';
import {settingsChildRoutes} from './settings/settings-child.routing';

const contentRoutes: Routes = [
    {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            {path: '', redirectTo: '/shopping-list', pathMatch: 'full'},
            shoppingListRoutes,
            costManagementRoutes,
            settingsRoutes,
            settingsChildRoutes
        ]
    }

];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);
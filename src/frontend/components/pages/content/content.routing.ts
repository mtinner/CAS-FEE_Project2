import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../login/auth-guard.service';
import {shoppingListRoutes} from './+shoppingList/shopping-list.routing';
import {costManagementRoutes} from './+costManagement/cost-management.routing';

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
            {path: 'settings', component: SettingsComponent}
        ]
    }

];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);
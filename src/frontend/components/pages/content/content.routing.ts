import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CostManagementComponent} from './costManagement/cost-management.component';
import {SettingsComponent} from './settings/settings.component';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../login/auth-guard.service';
import {shoppingListRoutes} from './shoppingList/shopping-list.routing';

const contentRoutes: Routes = [
    {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: '/shopping-list', pathMatch: 'full'},
            shoppingListRoutes,
            {path: 'cost-management', component: CostManagementComponent},
            {path: 'settings', component: SettingsComponent}
        ]
    }

];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {ShoppingListComponent} from './pages/shoppingList/shopping-list.component';
import {CostManagementComponent} from './pages/costManagement/cost-management.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'cost-management', component: CostManagementComponent},
    {path: '**', component: CostManagementComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});

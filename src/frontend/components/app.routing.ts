import {Routes, RouterModule} from '@angular/router';
import {ShoppingListComponent} from "./pages/shopping-list.component";
import {CostManagementComponent} from "./pages/cost-management.component";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'cost-management', component: CostManagementComponent},
    {path: '**', component: ShoppingListComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {ShoppingListComponent} from "./pages/shoppingList/shopping-list.component";
import {CostManagementComponent} from "./pages/costManagement/cost-management.component";
import {AuthGuard} from "./pages/login/auth-guard.service";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
    {path: 'cost-management', component: CostManagementComponent, canActivate: [AuthGuard]},
    {path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [AuthGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});

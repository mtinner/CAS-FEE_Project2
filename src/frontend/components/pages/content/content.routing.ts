import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CostManagementComponent} from "./costManagement/cost-management.component";
import {ShoppingListComponent} from "./shoppingList/shopping-list.component";
import {ContentComponent} from "./content.component";
import {AuthGuard} from "../login/auth-guard.service";

const contentRoutes: Routes = [
    {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', redirectTo: '/shopping-list',
                pathMatch: 'full'
            },
            {path: 'shopping-list', component: ShoppingListComponent},
            {path: 'cost-management', component: CostManagementComponent}
        ]
    }

];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
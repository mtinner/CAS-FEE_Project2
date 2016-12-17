import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentComponent} from './content.component';
import {AuthGuard} from '../../login/auth-guard.service';
import {memberRoute} from '../../members/member.route';
import {groupRoute} from '../../groups/group.route';
import {addExpenseRoute} from '../../addExpense/add-expense.route';

const contentRoutes: Routes = [
    {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuard],
        children: [
            memberRoute,
            groupRoute,
            addExpenseRoute
        ]
    }

];

export const contentRouting: ModuleWithProviders = RouterModule.forChild(contentRoutes);
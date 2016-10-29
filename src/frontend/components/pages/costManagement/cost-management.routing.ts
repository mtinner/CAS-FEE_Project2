import { Routes } from '@angular/router';
import { CostManagementComponent } from './cost-management.component';
import { CostManagementChildComponent } from './cost-management-child.component';
import { AddExpenseComponent } from './add-expense.component';

export const costManagementRoutes: Routes = [{
    path: 'cost-management',
    component: CostManagementComponent
}, {
    path: 'cost-management',
    component: CostManagementChildComponent,
    children: [
        { path: 'add', component: AddExpenseComponent }
    ]
}];
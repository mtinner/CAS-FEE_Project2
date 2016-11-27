import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ElementModule} from '../../elements/element.module';
import {RouterModule} from '@angular/router';
import {AddExpenseComponent} from './add-expense.component';
import {CostManagementModule} from '../costManagement/cost-management.module';
import {CostManagementService} from '../costManagement/cost-management.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ElementModule,
        RouterModule,
        CostManagementModule
    ],
    declarations: [
        AddExpenseComponent
    ]
})
export class AddExpenseModule {
}
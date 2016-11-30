import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ElementModule } from '../../elements/element.module';
import { RouterModule } from '@angular/router';
import { AddExpenseComponent } from './add-expense.component';
import { CostManagementModule } from '../costManagement/cost-management.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ElementModule,
        RouterModule,
        CostManagementModule,
        FormsModule
    ],
    declarations: [
        AddExpenseComponent
    ]
})
export class AddExpenseModule {
}

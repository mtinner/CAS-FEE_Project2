import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {CostManagementComponent} from './cost-management.component';
import {ElementModule} from '../../elements/element.module';
import {CostManagementChildComponent} from './cost-management-child.component';
import {AddExpenseComponent} from './add-expense.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        HttpModule,
        BrowserModule,
        ElementModule
    ],
    declarations: [
        CostManagementComponent,
        CostManagementChildComponent,
        AddExpenseComponent
    ]
})
export class CostManagementModule {
}
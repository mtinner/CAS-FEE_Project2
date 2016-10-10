import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ElementModule} from '../../../elements/element.module';
import {CostManagementComponent} from './cost-management.component';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ElementModule
    ],
    declarations: [
        CostManagementComponent
    ]
})
export class CostManagementModule {
}
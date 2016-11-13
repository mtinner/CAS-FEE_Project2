import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {CostManagementComponent} from './cost-management.component';
import {ElementModule} from '../../elements/element.module';

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
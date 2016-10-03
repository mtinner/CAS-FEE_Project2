import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AddComponent} from './add/add.component';
import {CardComponent} from './card/card.component';
import {ChipComponent} from './chip/chip.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InputFieldComponent} from './inputField/input-field.component';
import {RouterModule} from '@angular/router';
@NgModule({
    imports: [
        BrowserModule,
        RouterModule
    ],
    declarations: [
        AddComponent,
        CardComponent,
        ChipComponent,
        DashboardComponent,
        InputFieldComponent
    ],
    exports: [
        AddComponent,
        CardComponent,
        ChipComponent,
        DashboardComponent,
        InputFieldComponent
    ]
})
export class ElementModule {
}
import {SettingsComponent} from './settings.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElementModule} from '../../elements/element.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ElementModule,
        RouterModule
    ],
    declarations: [
        SettingsComponent
    ]
})
export class SettingsModule {
}
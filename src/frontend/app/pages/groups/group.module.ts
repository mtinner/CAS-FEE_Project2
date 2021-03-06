import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ElementModule} from '../../elements/element.module';
import {GroupComponent} from './group.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ElementModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        GroupComponent
    ]
})
export class GroupModule {
}
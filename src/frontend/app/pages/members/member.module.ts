import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ElementModule} from '../../elements/element.module';
import {RouterModule} from '@angular/router';
import {MemberComponent} from './member.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ElementModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        MemberComponent
    ]
})
export class MemberModule {
}
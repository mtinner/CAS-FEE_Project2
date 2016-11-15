import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ElementModule} from '../../elements/element.module';
import {RouterModule} from '@angular/router';
import {MemberComponent} from './member.component';
import {MemberService} from './member.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ElementModule,
        RouterModule
    ],
    declarations: [
        MemberComponent
    ],
    providers: [MemberService]
})
export class MemberModule {
}
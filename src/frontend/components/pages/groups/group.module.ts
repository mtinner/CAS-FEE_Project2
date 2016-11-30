import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ElementModule} from '../../elements/element.module';
import {GroupService} from './group.service';
import {GroupComponent} from './group.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ElementModule,
        FormsModule
    ],
    declarations: [
        GroupComponent
    ],
    providers: [GroupService]
})
export class GroupModule {
}
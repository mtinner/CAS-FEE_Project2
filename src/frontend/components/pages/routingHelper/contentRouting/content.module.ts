import {ContentComponent} from './content.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ElementModule} from '../../../elements/element.module';
import {contentRouting} from './content.routing';
import {MemberModule} from '../../members/member.module';
import {GroupModule} from '../../groups/group.module';
import {AddExpenseModule} from '../../addExpense/add-expense.module';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ElementModule,
        contentRouting,
        MemberModule,
        GroupModule,
        AddExpenseModule
    ],
    declarations: [
        ContentComponent,
    ]
})
export class ContentModule {
}
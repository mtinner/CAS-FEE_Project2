import {SettingsComponent} from './settings.component';
import {GroupSettingsComponent} from './group-settings.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ElementModule} from '../../../elements/element.module';
import {authServiceProvider} from '../../../common/authentication/auth-http.provider';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {SettingsChildComponent} from './settings-child.component';
import {GroupService} from './group.service';
import {CommonModule} from '@angular/common';
import {GroupMembersComponent} from './group-members.component';
import {GroupMemberService} from './group-member.service';
import {settingsChildRouting} from './settings-child.routing';

@NgModule({
    imports: [
        RouterModule,
        HttpModule,
        CommonModule,
        BrowserModule,
        ElementModule,
        settingsChildRouting
    ],
    declarations: [
        SettingsComponent,
        SettingsChildComponent,
        GroupSettingsComponent,
        GroupMembersComponent
    ],
    providers: [authServiceProvider, GroupService, GroupMemberService]
})
export class SettingsModule {
}
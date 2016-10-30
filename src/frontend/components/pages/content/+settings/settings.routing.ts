import {SettingsComponent} from './settings.component';
import {GroupSettingsComponent} from './group-settings.component';
import {SettingsChildComponent} from './settings-child.component';
import {Routes} from '@angular/router';
import {GroupMembersComponent} from './group-members.component';
import {GroupMemberService} from './group-member.service';

export const settingsRoutes: Routes = [{
    path: 'settings',
    component: SettingsComponent
}, {
    path: 'settings',
    component: SettingsChildComponent,
    children: [
        {path: 'groups', component: GroupSettingsComponent},
        {path: 'groups/:id', component: GroupMembersComponent, canActivate: [GroupMemberService]}
    ]
}];

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingsChildComponent} from './settings-child.component';
import {GroupSettingsComponent} from './group-settings.component';
import {GroupMembersComponent} from './group-members.component';
import {GroupMemberService} from './group-member.service';
import {AuthGuard} from '../../login/auth-guard.service';

const settingsChildRoutes: Routes = [
    {
        path: 'settings',
        component: SettingsChildComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            {path: 'groups', component: GroupSettingsComponent},
            {path: 'groups/:id', component: GroupMembersComponent, canActivate: [GroupMemberService]}
        ]
    }

];

export const settingsChildRouting: ModuleWithProviders = RouterModule.forChild(settingsChildRoutes);
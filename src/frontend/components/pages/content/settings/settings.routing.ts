import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../../login/auth-guard.service';
import {SettingsComponent} from './settings.component';
import {SettingsMenuComponent} from './settings-menu.component';
import {GroupSettingsComponent} from './group-settings.component';

const settingsRoutes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: SettingsMenuComponent},
            {path: 'groups', component: GroupSettingsComponent}
        ]
    }

];

export const settingsRouting: ModuleWithProviders = RouterModule.forChild(settingsRoutes);
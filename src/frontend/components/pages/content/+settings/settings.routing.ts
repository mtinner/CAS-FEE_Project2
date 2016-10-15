import {SettingsComponent} from './settings.component';
import {GroupSettingsComponent} from './group-settings.component';
import {SettingsChildComponent} from './settings-child.component';
import {Routes} from '@angular/router';

export const settingsRoutes: Routes = [{
    path: 'settings',
    component: SettingsComponent
}, {
    path: 'settings',
    component: SettingsChildComponent,
    children: [
        {path: 'groups', component: GroupSettingsComponent}
    ]
}];
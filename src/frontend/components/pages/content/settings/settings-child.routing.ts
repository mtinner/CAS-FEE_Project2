import {Route} from '@angular/router';
import {SettingsChildComponent} from './settings-child.component';
import {GroupSettingsComponent} from './group-settings.component';

export const settingsChildRoutes: Route = {
    path: 'settings',
    component: SettingsChildComponent,
    children: [
        {path: 'groups', component: GroupSettingsComponent}
    ]
};
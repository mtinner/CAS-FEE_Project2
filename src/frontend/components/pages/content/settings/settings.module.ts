import {SettingsComponent} from './settings.component';
import {SettingsMenuComponent} from './settings-menu.component';
import {GroupSettingsComponent} from './group-settings.component';
import {settingsRouting} from './settings.routing';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ElementModule} from '../../../elements/element.module';
import {authServiceProvider} from '../../../common/authentication/auth-http.provider';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ElementModule,
        settingsRouting
    ],
    declarations: [
        SettingsComponent,
        SettingsMenuComponent,
        GroupSettingsComponent
    ],
    providers: [authServiceProvider]
})
export class SettingsModule {
}
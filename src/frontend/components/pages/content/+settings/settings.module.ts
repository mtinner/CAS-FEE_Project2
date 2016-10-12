import {SettingsComponent} from './settings.component';
import {GroupSettingsComponent} from './group-settings.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ElementModule} from '../../../elements/element.module';
import {authServiceProvider} from '../../../common/authentication/auth-http.provider';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {SettingsChildComponent} from './settings-child.component';

@NgModule({
    imports: [
        RouterModule,
        HttpModule,
        BrowserModule,
        ElementModule,
    ],
    declarations: [
        SettingsComponent,
        SettingsChildComponent,
        GroupSettingsComponent
    ],
    providers: [authServiceProvider]
})
export class SettingsModule {
}
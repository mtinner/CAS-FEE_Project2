import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routing';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {ContentModule} from './pages/content/content.module';
import {ElementModule} from './elements/element.module';
import {RegisterService} from './pages/register/register.service';
import {RegisterComponent} from './pages/register/register.component';
import {LoginManagingService} from './pages/login/login-managing.service';
import {LoginHttpService} from './pages/login/login-http.service';

@NgModule({
    imports: [
        BrowserModule,
        ContentModule,
        ElementModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        appRoutingProviders,
        LoginHttpService,
        LoginManagingService,
        RegisterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
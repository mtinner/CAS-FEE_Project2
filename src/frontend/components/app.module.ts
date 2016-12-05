import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routing';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ElementModule} from './elements/element.module';
import {RegisterService} from './pages/register/register.service';
import {RegisterComponent} from './pages/register/register.component';
import {LoginManagingService} from './pages/login/login-managing.service';
import {LoginHttpService} from './pages/login/login-http.service';
import {authServiceProvider} from './common/authentication/auth-http.provider';
import {ContentModule} from './pages/routingHelper/contentRouting/content.module';
import {ContentSidebarModule} from './pages/routingHelper/contentSidebarRouting/content-sidebar.module';


@NgModule({
    imports: [
        BrowserModule,
        ElementModule,
        routing,
        ContentSidebarModule,
        ContentModule,
        ReactiveFormsModule
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
        RegisterService,
        authServiceProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

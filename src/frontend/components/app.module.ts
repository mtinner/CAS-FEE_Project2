import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routing';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {LoginService} from './pages/login/login.service';
import {ContentModule} from './pages/content/content.module';
import {ElementModule} from './elements/element.module';

@NgModule({
    imports: [
        BrowserModule,
        ContentModule,
        ElementModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        appRoutingProviders,
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
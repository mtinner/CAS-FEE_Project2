import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routing';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HttpModule, ConnectionBackend, RequestOptions, Http, XHRBackend} from '@angular/http';
import {LoginComponent} from './pages/login/login.component';
import {LoginService} from './pages/login/login.service';
import {ContentModule} from './pages/content/content.module';
import {AuthHttp} from './authHttp.service';

@NgModule({
    imports: [
        BrowserModule,
        ContentModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        appRoutingProviders,
        LoginService,
        new Provider(Http, {
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) =>
                new AuthHttp(backend, defaultOptions),
            deps: [XHRBackend, RequestOptions]
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
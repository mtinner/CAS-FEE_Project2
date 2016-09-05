import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app.component';
import {HttpModule, JsonpModule} from '@angular/http';
import {ApiService} from './services/api.service';


@NgModule({
    imports: [BrowserModule, HttpModule, JsonpModule, ApiService],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class BootstrapModule {
}

platformBrowserDynamic().bootstrapModule(BootstrapModule);
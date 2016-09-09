import {AppComponent} from "./app.component";
import {appRoutingProviders, routing} from "./app.routing";
import {CostManagementComponent} from "./pages/cost-management.component";
import {ShoppingListComponent} from "./pages/shopping-list.component";
import {LoginComponent} from "./login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ApiService} from "../services/api.service"; 
import {HttpModule, JsonpModule} from '@angular/http'; 

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        ShoppingListComponent,
        CostManagementComponent,
        LoginComponent
    ],
    providers: [
        appRoutingProviders,
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
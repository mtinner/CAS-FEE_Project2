import {AppComponent} from "./app.component";
import {appRoutingProviders, routing} from "./app.routing";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule, JsonpModule} from "@angular/http";
import {CostManagementComponent} from "./pages/costManagement/cost-management.component";
import {ShoppingListComponent} from "./pages/shoppingList/shopping-list.component";
import {ApiService} from "../services/api.service";
import {LoginComponent} from "./login/login.component";

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
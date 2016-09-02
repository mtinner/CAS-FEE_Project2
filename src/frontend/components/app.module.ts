import {AppComponent} from "./app.component";
import {appRoutingProviders, routing} from "./app.routing";
import {CostManagementComponent} from "./pages/cost-management.component";
import {ShoppingListComponent} from "./pages/shopping-list.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        ShoppingListComponent,
        CostManagementComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
import {ContentComponent} from "./content.component";
import {CostManagementComponent} from "./costManagement/cost-management.component";
import {ShoppingListComponent} from "./shoppingList/shopping-list.component";
import {contentRouting} from "./content.routing";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
    imports: [
        BrowserModule,
        contentRouting
    ],
    declarations: [
        ContentComponent,
        ShoppingListComponent,
        CostManagementComponent
    ],
    providers: []
})
export class ContentModule {
}
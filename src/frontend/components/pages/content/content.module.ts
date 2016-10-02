import {ContentComponent} from './content.component';
import {CostManagementComponent} from './costManagement/cost-management.component';
import {ShoppingListComponent} from './shoppingList/shopping-list.component';
import {contentRouting} from './content.routing';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {authServiceProvider} from "../../common/authentication/auth-http.provider";
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        contentRouting,
        HttpModule
    ],
    declarations: [
        ContentComponent,
        ShoppingListComponent,
        CostManagementComponent
    ],
    providers: [authServiceProvider]
})
export class ContentModule {
}
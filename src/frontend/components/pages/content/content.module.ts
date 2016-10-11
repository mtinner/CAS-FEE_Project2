import {ContentComponent} from './content.component';
import {contentRouting} from './content.routing';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ElementModule} from '../../elements/element.module';
import {SettingsModule} from './settings/settings.module';
import {authServiceProvider} from '../../common/authentication/auth-http.provider';
import {HttpModule} from '@angular/http';
import {ShoppingListModule} from './+shoppingList/shopping-list.module';
import {CostManagementModule} from './+costManagement/cost-management.module';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ElementModule,
        ShoppingListModule,
        CostManagementModule,
        SettingsModule,
        contentRouting
    ],
    declarations: [
        ContentComponent,
    ],
    providers: [authServiceProvider]
})
export class ContentModule {
}
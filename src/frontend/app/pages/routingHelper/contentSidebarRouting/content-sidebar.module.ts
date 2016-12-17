import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ContentSidebarComponent} from './content-sidebar.component';
import {contentSidebarRouting} from './content-sidebar.routing';
import {ShoppingListModule} from '../../shoppingList/shopping-list.module';
import {CostManagementModule} from '../../costManagement/cost-management.module';
import {SettingsModule} from '../../settings/settings.module';
import {ElementModule} from '../../../elements/element.module';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ElementModule,
        contentSidebarRouting,
        ShoppingListModule,
        CostManagementModule,
        SettingsModule
    ],
    declarations: [
        ContentSidebarComponent,
    ]
})
export class ContentSidebarModule {
}
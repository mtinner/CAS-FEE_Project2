import {ContentComponent} from './content.component';
import {CostManagementComponent} from './costManagement/cost-management.component';
import {ShoppingListComponent} from './shoppingList/shopping-list.component';
import {contentRouting} from './content.routing';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ElementModule} from '../../elements/element.module';
import {ArticlesByGroupPipe} from './shoppingList/articles-by-group.pipe';
@NgModule({
    imports: [
        BrowserModule,
        ElementModule,
        contentRouting
    ],
    declarations: [
        ContentComponent,
        ShoppingListComponent,
        CostManagementComponent,
        ArticlesByGroupPipe
    ],
    providers: [authServiceProvider]
})
export class ContentModule {
}
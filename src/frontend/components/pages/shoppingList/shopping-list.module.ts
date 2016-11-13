import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ShoppingListComponent} from './shopping-list.component';
import {ArticlesByGroupPipe} from './articles-by-group.pipe';
import {ElementModule} from '../../elements/element.module';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ElementModule
    ],
    declarations: [
        ShoppingListComponent,
        ArticlesByGroupPipe
    ]
})
export class ShoppingListModule {
}
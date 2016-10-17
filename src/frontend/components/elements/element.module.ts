import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AddComponent} from './add/add.component';
import {CardComponent} from './card/card.component';
import {ChipComponent} from './chip/chip.component';
import {RadioComponent} from './radio/radio.component';
import {InputFieldComponent} from './inputField/input-field.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HeaderService} from './header/header.service';
import {SideNavComponent} from './sidenav/side-nav.component';
import {SideNavService} from './sidenav/side-nav.service';
import {FormsModule} from '@angular/forms';
import {PanelComponent} from './panel/panel.component';
import {SnackbarComponent} from './snackbar/snackbar.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule
    ],
    declarations: [
        AddComponent,
        CardComponent,
        ChipComponent,
        HeaderComponent,
        SideNavComponent,
        InputFieldComponent,
        RadioComponent,
        PanelComponent,
        SnackbarComponent
    ],
    exports: [
        AddComponent,
        CardComponent,
        ChipComponent,
        HeaderComponent,
        SideNavComponent,
        InputFieldComponent,
        RadioComponent,
        PanelComponent,
        SnackbarComponent
    ],
    providers: [HeaderService, SideNavService]
})
export class ElementModule {
}
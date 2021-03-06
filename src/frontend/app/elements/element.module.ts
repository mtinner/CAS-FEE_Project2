import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddComponent } from './add/add.component';
import { CardComponent } from './card/card.component';
import { ChipComponent } from './chip/chip.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputFieldComponent } from './inputField/input-field.component';
import { CostProgress } from './costProgress/cost-progress.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { SideNavComponent } from './sidenav/side-nav.component';
import { SideNavService } from './sidenav/side-nav.service';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from './snackbar/snackbar.service';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        CommonModule
    ],
    declarations: [
        AddComponent,
        CardComponent,
        ChipComponent,
        HeaderComponent,
        SideNavComponent,
        InputFieldComponent,
        CostProgress,
        RadioComponent,
        CheckboxComponent,
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
        CostProgress,
        RadioComponent,
        CheckboxComponent,
        PanelComponent,
        SnackbarComponent
    ],
    providers: [HeaderService, SideNavService, SnackbarService]
})
export class ElementModule {
}

import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'snackbar',
    templateUrl: 'snackbar.component.html',
    styleUrls: ['snackbar.component.css']
})
export class SnackbarComponent {
    @Input()
    text: string;
}
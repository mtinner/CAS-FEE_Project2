import {Component} from '@angular/core';
import {SnackbarService} from './snackbar.service';

@Component({
    moduleId: module.id,
    selector: 'snackbar',
    templateUrl: 'snackbar.component.html',
    styleUrls: ['snackbar.component.css']
})
export class SnackbarComponent {
    constructor(public snackbarService: SnackbarService) {
    }
}
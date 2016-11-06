import {Component} from '@angular/core';
import {HeaderService} from './header.service';

@Component({
    moduleId: module.id,
    selector: 'custom-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {

    private headerConfig;

    constructor(public headerService: HeaderService) {
        this.headerConfig = headerService.headerConfig;
    }

    clickLeftIcon() {
        this.headerService.clickLeftIcon();
    }

    clickRightIcon() {
        this.headerService.clickRightIcon();
    }
}
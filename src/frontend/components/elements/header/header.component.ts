import {Component} from '@angular/core';
import {HeaderService} from './header.service';

@Component({
    moduleId: module.id,
    selector: 'custom-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {

    private headerConfig;

    constructor(private headerService: HeaderService) {
        this.headerConfig = headerService.headerConfig;
    }

    clickLeftIcon() {
        this.headerService.clickLeftIcon();
    }

    clickRightIcon() {
        this.headerService.clickRightIcon();
    }
}
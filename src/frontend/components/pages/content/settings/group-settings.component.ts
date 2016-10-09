import {Component} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';

@Component({
    moduleId: module.id,
    templateUrl: 'group-settings.component.html'
})
export class GroupSettingsComponent {
    constructor(private headerService: HeaderService) {
        this.headerService.headerConfig = new HeaderConfig('Group Settings', HeaderStyle.Settings, HeaderIcon.arrowleft);
    }
}
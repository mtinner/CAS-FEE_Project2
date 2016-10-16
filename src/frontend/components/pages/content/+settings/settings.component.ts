import {Component} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {Setting} from '../../../../models/Setting';


@Component({
    moduleId: module.id,
    templateUrl: 'settings.component.html'
})
export class SettingsComponent {
    private settings: Setting[] = [
        new Setting('groups', 'Group Membership', 'Manage with whom you\'re sharing shopping list & expenditures'),
        new Setting('.', 'Article Groups', 'Set how individual articles should be grouped'),
        new Setting('.', 'History')
    ];

    constructor(private headerService: HeaderService) {
        this.headerService.headerConfig = new HeaderConfig('Settings', HeaderStyle.Settings, HeaderIcon.Burger);
    }
}
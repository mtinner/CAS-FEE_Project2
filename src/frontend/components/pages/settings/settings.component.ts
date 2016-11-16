import {Component, OnDestroy} from '@angular/core';
import {Setting} from '../../../models/Setting';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';


@Component({
    moduleId: module.id,
    templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnDestroy {
    public settings: Setting[] = [
        new Setting('/groups', 'Group Membership', `Manage with whom you're sharing shopping list & expenses`),
        new Setting('.', 'Article Groups', 'Set how individual articles should be grouped'),
        new Setting('.', 'History')
    ];

    constructor(private headerService: HeaderService) {
        this.headerService.headerConfig = new HeaderConfig('Settings', HeaderStyle.Settings, HeaderIcon.Burger);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
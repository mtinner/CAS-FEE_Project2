import {Component} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';

@Component({
    moduleId: module.id,
    templateUrl: 'group-settings.component.html'
})
export class GroupSettingsComponent {
    private groups: GroupSetting[] = [
        new GroupSetting('.', 'g1', 'selectedGroup', 'Group 1'),
        new GroupSetting('.', 'g2', 'selectedGroup', 'Group 2'),
        new GroupSetting('.', 'g3', 'selectedGroup', 'Group 3')
    ];

    constructor(private headerService: HeaderService) {
        this.headerService.headerConfig = new HeaderConfig('Group Settings', HeaderStyle.Settings, HeaderIcon.arrowleft);
    }
}

class GroupSetting {
    constructor(private route: string, private id: string, private name: string, private label: string) {
    }
}
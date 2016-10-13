import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {GroupService} from './group.service';

@Component({
    moduleId: module.id,
    templateUrl: 'group-settings.component.html'
})
export class GroupSettingsComponent implements OnInit {

   /* private groups: GroupSetting[] = [
        new GroupSetting('.', 'g1', 'selectedGroup', 'Group 1'),
        new GroupSetting('.', 'g2', 'selectedGroup', 'Group 2'),
        new GroupSetting('.', 'g3', 'selectedGroup', 'Group 3')
    ];*/

    constructor(private headerService: HeaderService, private groupService: GroupService) {
        this.headerService.headerConfig = new HeaderConfig('Group Settings', HeaderStyle.Settings, HeaderIcon.arrowleft);
    }

    ngOnInit(): void {
        this.groupService.fetchGroups();
    }
}

/*
class GroupSetting {
    constructor(private route: string, private id: string, private name: string, private label: string) {
    }
}*/

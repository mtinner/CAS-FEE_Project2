import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {GroupService} from './group.service';
import {Group} from '../../../../models/Group';

@Component({
    moduleId: module.id,
    templateUrl: 'group-settings.component.html'
})
export class GroupSettingsComponent implements OnInit, OnDestroy  {

    constructor(private headerService: HeaderService, private groupService: GroupService) {
        this.headerService.headerConfig = new HeaderConfig('Group Settings', HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToSettings);
    }

    onChange(obj: Group) {
        this.groupService.setActiveGroup(obj.id);
    }

    ngOnInit(): void {
        this.groupService.fetchGroups();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
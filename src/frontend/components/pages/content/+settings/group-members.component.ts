import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {GroupService} from './group.service';

@Component({
    moduleId: module.id,
    templateUrl: 'group-members.component.html',
    styleUrls: ['group-members.component.css']
})
export class GroupMembersComponent implements OnInit, OnDestroy {

    constructor(private headerService: HeaderService, private groupService: GroupService) {
        this.headerService.headerConfig = new HeaderConfig('Group Members', HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToGroups, HeaderIcon.Leave);
    }

    ngOnInit(): void {
        // this.groupService.fetchGroups();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
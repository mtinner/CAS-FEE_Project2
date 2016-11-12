import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {GroupService} from './group.service';
import {Group} from '../../../../models/Group';

@Component({
    moduleId: module.id,
    templateUrl: 'group-settings.component.html',
    styleUrls: ['group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, OnDestroy {

    private groupname: string = '';
    public showModal: boolean = false;

    constructor(private headerService: HeaderService, public groupService: GroupService) {
        this.headerService.headerConfig = new HeaderConfig('Group Settings', HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToSettings);
    }

    setGroupname(value: string) {
        this.groupname = value.trim();
    }

    addGroup() {
        this.groupService.addGroup({name: this.groupname})
            .subscribe(() => {
                this.groupname = '';
                this.showModal = false;
            });
    }

    setModalVisibility(value: boolean) {
        this.showModal = value;
    }

    onGroupChange(obj: Group) {
        this.groupService.setActiveGroup(obj.id).subscribe();
    }

    ngOnInit(): void {
        this.groupService.fetchGroups().subscribe();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
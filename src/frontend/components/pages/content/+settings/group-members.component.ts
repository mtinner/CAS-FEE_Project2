import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {GroupService} from './group.service';
import {Params, ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'group-members.component.html',
    styleUrls: ['group-members.component.css']
})
export class GroupMembersComponent implements OnInit, OnDestroy {
    private inputField: Object = {
        invitedEmail: {placeholder: 'Email', type: 'mail'}
    };


    private invitedEmail: string = '';
    private groupId: string = '';
    private showModal: boolean = false;

    constructor(private headerService: HeaderService, private groupService: GroupService, private route: ActivatedRoute) {
        this.headerService.headerConfig = new HeaderConfig('Group Members', HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToGroups, HeaderIcon.Leave);
    }

    setInvitedEmail(value: string) {
        this.invitedEmail = value.trim();
    }

    setModalVisibility(value: boolean) {
        this.showModal = value;
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.groupId= params['id'];
            this.groupService.getMembers(this.groupId);
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
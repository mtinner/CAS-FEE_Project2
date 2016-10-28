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
        invitedEmail: {placeholder: 'Email', type: 'mail', errorMessage: ''}
    };


    private invitedEmail: string = '';
    private groupId: string = '';
    private showModal: boolean = false;

    constructor(private headerService: HeaderService, private groupService: GroupService, private route: ActivatedRoute) {
        this.headerService.headerConfig = new HeaderConfig('Group Members', HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToGroups);
    }

    setInvitedEmail(value: string) {
        this.invitedEmail = value.trim();
        if (this.isEmailValid()) {
            this.clearErrorMessage();
        }
    }

    setModalVisibility(value: boolean) {
        this.showModal = value;
        if (!value) {
            this.clearErrorMessage();
        }
    }

    isEmailValid() {
        let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return this.invitedEmail.match(regex);
    }

    clearErrorMessage() {
        this.inputField['invitedEmail'].errorMessage = '';
    }

    addMember() {
        if (!this.isEmailValid()) {
            this.inputField['invitedEmail'].errorMessage = 'Emailaddress not valid';
        }
        else {
            this.groupService.addMember(this.groupId, {email: this.invitedEmail})
                .subscribe(() => {
                        this.invitedEmail = '';
                        this.showModal = false;
                    },
                    () => {
                        this.inputField['invitedEmail'].errorMessage = 'Email address not found';
                    });
        }
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.groupId = params['id'];
            this.groupService.getMembers(this.groupId);
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
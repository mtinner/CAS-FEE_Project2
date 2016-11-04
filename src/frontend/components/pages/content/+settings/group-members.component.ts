import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {GroupService} from './group.service';
import {Params, ActivatedRoute} from '@angular/router';
import {GroupMemberService} from './group-member.service';

@Component({
    moduleId: module.id,
    templateUrl: 'group-members.component.html',
    styleUrls: ['group-members.component.css']
})
export class GroupMembersComponent implements OnInit, OnDestroy {
    private inputField: Object = {
        invitedEmail: {placeholder: 'Email', type: 'email', errorMessage: ''},
        groupname: {placeholder: 'Groupname', type: 'text', text: this.groupMemberService.group.name}
    };

    private invitedEmail: string = '';
    private groupId: string = '';
    private showMemberModal: boolean = false;
    private showLeaveModal: boolean = false;
    private showRenameModal: boolean = false;

    constructor(private headerService: HeaderService, private groupService: GroupService, private groupMemberService: GroupMemberService, private route: ActivatedRoute) {
    }

    setInvitedEmail(value: string) {
        this.invitedEmail = value.trim();
        if (this.isEmailValid()) {
            this.clearErrorMessage();
        }
    }

    setMemberModalVisibility(value: boolean) {
        this.showMemberModal = value;
    }

    setRenameModalVisibility = (value: boolean = true) => {
        this.showRenameModal = value;
    };

    setLeaveModalVisibility(value: boolean) {
        this.showLeaveModal = value;
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
                        this.showMemberModal = false;
                    },
                    () => {
                        this.inputField['invitedEmail'].errorMessage = 'Email address not found';
                    });
        }
    }

    renameGroup(groupname) {
        console.log(groupname);
    }

    leaveGroup(event) {
        this.groupService.leaveGroup(this.groupId, event.description)
            .subscribe(() => this.groupService.goToGroups());
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig(`Group ${this.groupMemberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibility);

        this.route.params.forEach((params: Params) => {
            this.groupId = params['id'];
            this.groupService.getMembers(this.groupId);
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import {Params, ActivatedRoute} from '@angular/router';
import {GroupMemberService} from './group-member.service';
import {InputField} from '../../../elements/inputField/InputField';

@Component({
    moduleId: module.id,
    templateUrl: 'group-members.component.html',
    styleUrls: ['group-members.component.css']
})
export class GroupMembersComponent implements OnInit, OnDestroy {
    private groupnameInputField: InputField = new InputField('Groupname', 'text', this.groupMemberService.group.name);
    private invitedEmailInputField: InputField = new InputField('Email', 'email');

    private invitedEmail: string = '';
    private groupId: string = '';
    public showMemberModal: boolean = false;
    public showLeaveModal: boolean = false;
	public showRenameModal: boolean = false;

    constructor(private headerService: HeaderService, public groupMemberService: GroupMemberService, private route: ActivatedRoute) {
    }

    setInvitedEmail(value: string) {
        this.invitedEmail = value.trim();
        if (this.isEmailValid()) {
            this.clearInvitedEmailErrorMessage();
        }
    }

    setMemberModalVisibility(value: boolean) {
        this.showMemberModal = value;
        if (!value) {
            this.clearInvitedEmailErrorMessage();
        }
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

    clearInvitedEmailErrorMessage() {
        this.invitedEmailInputField.errorMessage = '';
    }

    addMember() {
        if (!this.isEmailValid()) {
            this.invitedEmailInputField.errorMessage = 'Emailaddress not valid';
        }
        else {
            this.groupMemberService.addMember(this.groupId, {email: this.invitedEmail})
                .subscribe(() => {
                        this.invitedEmail = '';
                        this.showMemberModal = false;
                    },
                    () => {
                        this.invitedEmailInputField.errorMessage = 'Email address not found';
                    });
        }
    }

    renameGroup(groupname) {
        if (this.groupMemberService.group.name !== groupname) {
            this.groupMemberService.renameGroup(this.groupId, groupname)
                .subscribe(() => {
                    this.setRenameModalVisibility(false);
                    this.headerService.headerConfig = new HeaderConfig(`Group ${this.groupMemberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupMemberService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibility);
                    this.groupnameInputField.text = this.groupMemberService.group.name;
                });
        }
        else {
            this.setRenameModalVisibility(false);
        }
    }

    leaveGroup(event) {
        this.groupMemberService.leaveGroup(this.groupId, event.description)
            .subscribe(() => this.groupMemberService.goToGroups());
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig(`Group ${this.groupMemberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupMemberService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibility);

        this.route.params.forEach((params: Params) => {
            this.groupId = params['id'];
            this.groupMemberService.getMembers(this.groupId);
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

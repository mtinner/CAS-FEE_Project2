import {Component, OnInit, OnDestroy} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderIcon, HeaderStyle} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {MemberService} from './member.service';
import {FormControl, Validators} from '@angular/forms';
import {validateNotBlank} from '../../validators/not-blank.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'member.component.html',
    styleUrls: ['member.component.css']
})
export class MemberComponent implements OnInit, OnDestroy {

    public invitedErrorMessage: string = '';
    private invitedEmail: string = '';
    private groupId: string = '';
    public showMemberModal: boolean = false;
    public showLeaveModal: boolean = false;
    public showRenameModal: boolean = false;
    private groupRenameControl: FormControl = new FormControl();

    constructor(private headerService: HeaderService, public memberService: MemberService, private route: ActivatedRoute) {
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
        this.invitedErrorMessage = '';
    }

    addMember() {
        if (!this.isEmailValid()) {
            this.invitedErrorMessage = 'Emailaddress not valid';
        }
        else {
            this.memberService.addMember(this.groupId, {email: this.invitedEmail})
                .subscribe(() => {
                        this.invitedEmail = '';
                        this.showMemberModal = false;
                    },
                    () => {
                        this.invitedErrorMessage = 'Email address not found';
                    });
        }
    }

    renameGroup(groupname) {
        groupname = groupname.trim();
        if (this.memberService.group.name !== groupname) {
            this.memberService.renameGroup(this.groupId, groupname)
                .subscribe(() => {
                    this.setRenameModalVisibility(false);
                    this.headerService.headerConfig = new HeaderConfig(`Group ${this.memberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.memberService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibility);
                });
        }
        else {
            this.setRenameModalVisibility(false);
        }
    }

    leaveGroup(event) {
        this.memberService.leaveGroup(this.groupId, event.description)
            .subscribe(() => this.memberService.goToGroups());
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig(`Group ${this.memberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.memberService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibility);
        this.groupRenameControl = new FormControl(this.memberService.group.name, [Validators.required, validateNotBlank]);
        this.route.params.forEach((params: Params) => {
            this.groupId = params['id'];
            this.memberService.getMembers(this.groupId).subscribe();
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

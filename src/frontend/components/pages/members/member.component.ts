import {Component, OnInit, OnDestroy} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderIcon, HeaderStyle} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {MemberService} from './member.service';
import {FormControl, Validators} from '@angular/forms';
import {validateNotBlank} from '../../validators/not-blank.validator';
import {validateEmail} from '../../validators/email-input.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'member.component.html',
    styleUrls: ['member.component.css']
})
export class MemberComponent implements OnInit, OnDestroy {

    private groupId: string = '';
    public showMemberModal: boolean = false;
    public showLeaveModal: boolean = false;
    public showRenameModal: boolean = false;
    private groupRenameControl: FormControl = new FormControl();
    private groupMemberControl: FormControl = new FormControl();
    // AoT
    public invitedEmail: string = '';

    constructor(private headerService: HeaderService, public memberService: MemberService, private route: ActivatedRoute) {
    }

    setMemberModalVisibility(value: boolean) {
        this.showMemberModal = value;
        if (!value) {
            this.groupMemberControl.reset();
        }
    }

    setRenameModalVisibility = (value: boolean) => {
        this.showRenameModal = value;
    };

    setRenameModalVisibilityCallback(value: boolean) {
        return () => {
            this.setRenameModalVisibility(value);
        };
    }

    setLeaveModalVisibility(value: boolean) {
        this.showLeaveModal = value;
    }

    addMember(email) {
        this.memberService.addMember(this.groupId, {email: email})
            .subscribe(() => {
                this.groupMemberControl.reset();
                this.showMemberModal = false;
            });

    }

    renameGroup(groupname) {
        groupname = groupname.trim();
        if (this.memberService.group.name !== groupname) {
            this.memberService.renameGroup(this.groupId, groupname)
                .subscribe(() => {
                    this.setRenameModalVisibility(false);
                    this.headerService.headerConfig = new HeaderConfig(`Group ${this.memberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.memberService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibilityCallback(true));
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
        this.headerService.headerConfig = new HeaderConfig(`Group ${this.memberService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.memberService.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibilityCallback(true));
        this.groupRenameControl = new FormControl(this.memberService.group.name, [Validators.required, validateNotBlank]);
        this.groupMemberControl = new FormControl('', [Validators.required, validateNotBlank, validateEmail]);
        this.route.params.forEach((params: Params) => {
            this.groupId = params['id'];
            this.memberService.getMembers(this.groupId).subscribe();
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

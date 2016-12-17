import {Component, OnInit, OnDestroy} from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderIcon, HeaderStyle} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {FormControl, Validators} from '@angular/forms';
import {validateNotBlank} from '../../validators/not-blank.validator';
import {validateEmail} from '../../validators/email-input.validator';
import {GroupService} from '../../common/services/group.service';

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

    constructor(private headerService: HeaderService, public groupService: GroupService, private route: ActivatedRoute, private router: Router) {
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

    addMember() {
        this.groupService.addMember(this.groupId, {email: this.groupMemberControl.value})
            .subscribe(() => {
                this.groupMemberControl.reset();
                this.showMemberModal = false;
            });

    }

    renameGroup() {
        let groupname = this.groupRenameControl.value.trim();
        if (this.groupService.group.name !== groupname) {
            this.groupService.renameGroup(this.groupId, groupname)
                .subscribe(() => {
                    this.setRenameModalVisibility(false);
                    this.headerService.headerConfig = new HeaderConfig(`Group ${this.groupService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibilityCallback(true));
                });
        }
        else {
            this.setRenameModalVisibility(false);
        }
    }

    leaveGroup(event) {
        this.groupService.leaveGroup(this.groupId, event.description)
            .subscribe(() => this.goToGroups());
    }

    goToGroups = () => {
        this.router.navigate(['groups']);
    };

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig(`Group ${this.groupService.group.name}`, HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.goToGroups, HeaderIcon.Edit, this.setRenameModalVisibilityCallback(true));
        this.groupRenameControl = new FormControl(this.groupService.group.name, [Validators.required, validateNotBlank]);
        this.groupMemberControl = new FormControl('', [Validators.required, validateNotBlank, validateEmail]);
        this.route.params.forEach((params: Params) => {
            this.groupId = params['id'];
            this.groupService.getMembers(this.groupId).subscribe();
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

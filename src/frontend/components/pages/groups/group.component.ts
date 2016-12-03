import {Component, OnInit, OnDestroy} from '@angular/core';
import {GroupService} from './group.service';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../elements/header/header.enum';
import {Group} from '../../../models/Group';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {FormControl, Validators} from '@angular/forms';
import {validateNotBlank} from '../../validators/not-blank.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'group.component.html',
    styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

    ///public groupname: string = '';
    public showModal: boolean = false;
    private groupNameControl: FormControl = new FormControl();


    constructor(private headerService: HeaderService, public groupService: GroupService) {
        this.headerService.headerConfig = new HeaderConfig('Group Settings', HeaderStyle.Settings, HeaderIcon.ArrowLeft, this.groupService.goToSettings);
    }

    addGroup(groupname) {
        groupname = groupname.trim();
        this.groupService.addGroup({name: groupname})
            .subscribe(() => {
                this.groupNameControl.reset();
                this.showModal = false;
            });
    }

    setModalVisibility(value: boolean) {
        this.showModal = value;
        if (!value) {
            this.groupNameControl.reset();
        }
    }

    onGroupChange(obj: Group) {
        this.groupService.setActiveGroup(obj.id).subscribe();
    }

    ngOnInit(): void {
        this.groupService.fetchGroups().subscribe();
        this.groupNameControl = new FormControl('', [Validators.required, validateNotBlank]);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}
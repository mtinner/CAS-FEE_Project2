import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {Header} from '../../../elements/header/header.enum';

@Component({
    moduleId: module.id,
    templateUrl: 'cost-management.component.html'
})
export class CostManagementComponent implements OnInit, OnDestroy {

    constructor(private headerService: HeaderService) {
    }

    ngOnInit(): void {
        this.headerService.headerConfig = {
            title: 'Cost Management',
            type: Header.CostManagement
        };
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

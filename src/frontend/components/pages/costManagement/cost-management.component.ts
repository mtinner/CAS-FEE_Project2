import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../../elements/header/header.service';
import { HeaderStyle } from '../../elements/header/header.enum';
import { HeaderConfig } from '../../../models/HeaderConfig';
import { CostManagementService } from './cost-management.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'cost-management.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['cost-management.component.css']
})
export class CostManagementComponent implements OnInit, OnDestroy {
    constructor(private headerService: HeaderService,
        public costManagementService: CostManagementService,
        private router: Router) {
    }

    navigateToAdd() {
        this.router.navigate(['cost-management/add']);
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Cost Management', HeaderStyle.CostManagement);
        this.costManagementService.getCurrentMembers();
        this.costManagementService.getExpenses(4);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
        this.costManagementService.clearExpenses();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../elements/header/header.service';
import { HeaderIcon, HeaderStyle } from '../../elements/header/header.enum';
import { HeaderConfig } from '../../../models/HeaderConfig';
import { CostManagementService } from './cost-management.service';

@Component({
    moduleId: module.id,
    templateUrl: 'cost-management.component.html',
    styleUrls: ['cost-management.component.css']
})
export class CostManagementComponent implements OnInit, OnDestroy {
    constructor(
        private headerService: HeaderService,
        public costManagementService: CostManagementService) {
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Cost Management', HeaderStyle.CostManagement);
        this.costManagementService.getExpenses(5);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

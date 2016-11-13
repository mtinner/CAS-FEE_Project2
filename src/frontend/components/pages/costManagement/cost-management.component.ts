import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderIcon, HeaderStyle} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import { CostManagementService } from './cost-management.service';

@Component({
    moduleId: module.id,
    templateUrl: 'cost-management.component.html'
})
export class CostManagementComponent implements OnInit, OnDestroy {

    overviewTitle: string = 'Übersicht';
    currentMonthTitle: string = 'Aktueller Monat';
    addExpenseRoute: string = 'add';

    expenses = [
        { title: 'September 2016' },
        { title: 'Oktober 2016' },
        { title: 'November 2016' },
    ];

    constructor(
        private headerService: HeaderService,
        private costManagementService: CostManagementService) {
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Cost Management', HeaderStyle.CostManagement);
        const now = new Date();
        this.costManagementService.getExpenses(now.getFullYear(), now.getMonth() + 1).subscribe();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

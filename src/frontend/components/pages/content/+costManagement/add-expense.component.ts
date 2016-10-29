import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../../elements/header/header.enum';
import {HeaderConfig} from '../../../../models/HeaderConfig';
import { CostManagementService } from './cost-management.service';

@Component({
    moduleId: module.id,
    templateUrl: 'add-expense.component.html'
})
export class AddExpenseComponent implements OnInit, OnDestroy {

    constructor(private headerService: HeaderService, private costManagementService: CostManagementService) {
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Add Expense', HeaderStyle.CostManagement, HeaderIcon.ArrowLeft, this.costManagementService.goToCostManagement);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

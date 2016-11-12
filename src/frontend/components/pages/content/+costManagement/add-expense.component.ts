import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../../elements/header/header.service';
import { HeaderStyle, HeaderIcon } from '../../../elements/header/header.enum';
import { HeaderConfig } from '../../../../models/HeaderConfig';
import { ExpenseMember, ExpenseMemberObj } from '../../../../models/ExpenseMember';
import { CostManagementService } from './cost-management.service';

@Component({
    moduleId: module.id,
    templateUrl: 'add-expense.component.html',
    styleUrls: ['add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
    private description: string;
    private amount: number;

    constructor(
        private headerService: HeaderService,
        private costManagementService: CostManagementService) {
    }

    setDescription(value) {
        this.description = value;
    };

    setAmount(value) {
        this.amount = +value;
    };

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Add Expense', HeaderStyle.CostManagement, HeaderIcon.ArrowLeft, this.costManagementService.goToCostManagement);
        const memberResponse = this.costManagementService.getCurrentMembers().subscribe();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

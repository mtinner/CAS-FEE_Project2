import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../../elements/header/header.service';
import { HeaderStyle, HeaderIcon } from '../../../elements/header/header.enum';
import { HeaderConfig } from '../../../../models/HeaderConfig';
import { ExpenseMember, ExpenseMemberObj } from '../../../../models/ExpenseMember';
import { CostManagementService } from './cost-management.service';

@Component({
    moduleId: module.id,
    templateUrl: 'add-expense.component.html'
})
export class AddExpenseComponent implements OnInit, OnDestroy {

    private inputField: Object = {
        description: { placeholder: 'Description', type: 'text' },
        amount: { placeholder: 'Amount', type: 'text' }
    };
    private description: string;
    private amount: number;
    private members: ExpenseMember[];

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
        const memberResponse = this.costManagementService.getCurrentMembers();
        memberResponse.subscribe((memberObj: ExpenseMemberObj) => {
            this.members = memberObj.members;
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {ExpenseInsert} from '../../../models/ExpenseInsert';
import {CostManagementService} from '../costManagement/cost-management.service';

@Component({
    moduleId: module.id,
    templateUrl: 'add-expense.component.html',
    styleUrls: ['add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
    private description: string;
    private amount: number;

    constructor(private headerService: HeaderService,
                public costManagementService: CostManagementService) {
    }

    setDescription(value) {
        this.description = value;
    };

    setAmount(value) {
        this.amount = +value;
    };

    onAddClick() {
        const today = new Date();
        const debitorsEmails = this.costManagementService.members.filter(member => member.checked).map(member => member.email);
        this.costManagementService.addExpense(new ExpenseInsert(
            this.description,
            this.amount,
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
            debitorsEmails
        )).subscribe();
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Add Expense', HeaderStyle.CostManagement, HeaderIcon.ArrowLeft, this.costManagementService.goToCostManagement);
        const memberResponse = this.costManagementService.getCurrentMembers().subscribe();
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

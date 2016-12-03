import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {ExpenseInsert} from '../../../models/ExpenseInsert';
import {CostManagementService} from '../costManagement/cost-management.service';
import {Validators, FormControl} from '@angular/forms';
import {validateNotBlank} from '../../validators/not-blank.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'add-expense.component.html',
    styleUrls: ['add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
    public amountControl: FormControl;
    public descriptionControl: FormControl;

    constructor(private headerService: HeaderService,
                public costManagementService: CostManagementService) {
    }

    onAddClick() {
        const today = new Date();
        const debitorsEmails = this.costManagementService.members.filter(member => member.checked).map(member => member.email);
        this.costManagementService.addExpense(new ExpenseInsert(
            this.descriptionControl.value,
            +this.amountControl.value,
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
            debitorsEmails
        )).subscribe();
    }

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Add Expense', HeaderStyle.CostManagement, HeaderIcon.ArrowLeft, this.costManagementService.goToCostManagement);
        const memberResponse = this.costManagementService.getCurrentMembers().subscribe();

       this.descriptionControl = new FormControl('', [Validators.required, validateNotBlank]);
       this.amountControl = new FormControl('', [Validators.required, validateNotBlank, Validators.pattern('^[0-9]+(\\.|,)?[0-9]{0,2}$')]);
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from '../../elements/header/header.service';
import {HeaderStyle, HeaderIcon} from '../../elements/header/header.enum';
import {HeaderConfig} from '../../../models/HeaderConfig';
import {ExpenseInsert} from '../../../models/ExpenseInsert';
import {CostManagementService} from '../../common/services/cost-management.service';
import {Validators, FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {validateNotBlank} from '../../validators/not-blank.validator';
import {validateSomeOfArray} from '../../validators/some-of-array.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'add-expense.component.html',
    styleUrls: ['add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
    public expenseForm: FormGroup;

    constructor(
        private headerService: HeaderService,
        public costManagementService: CostManagementService,
        private router: Router, private formBuilder: FormBuilder) {
    }

    onAddClick() {
        const today = new Date();
        const debitorsEmails = this.costManagementService.members.filter(member => member.checked).map(member => member.email);
        this.costManagementService.addExpense(new ExpenseInsert(
            this.expenseForm.controls['descriptionControl'].value,
            +this.expenseForm.controls['amountControl'].value,
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
            debitorsEmails,
            new Date()
        )).subscribe(() => this.router.navigate(['cost-management']));
    }

    goToCostManagement = () => {
        this.router.navigate(['cost-management']);
    };

    ngOnInit(): void {
        this.headerService.headerConfig = new HeaderConfig('Add Expense', HeaderStyle.CostManagement, HeaderIcon.ArrowLeft, this.goToCostManagement);
        this.costManagementService
            .getCurrentMembers()
            .subscribe((members) => {
                members.forEach((member) => {
                    const control = <FormArray>this.expenseForm.controls['members'];
                    control.push(new FormControl(member.checked));
                });
        });
        this.expenseForm = this.formBuilder.group({
            descriptionControl: ['', [Validators.required, validateNotBlank]],
            amountControl: ['', [Validators.required, validateNotBlank, Validators.pattern('^[0-9]+(\\.|,)?[0-9]{0,2}$')]],
            members: this.formBuilder.array([], validateSomeOfArray)
        });
    }

    ngOnDestroy(): void {
        this.headerService.resetHeader();
    }
}

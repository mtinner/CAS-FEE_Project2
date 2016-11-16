import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../app.service';
import {Group, GroupObj} from '../../../models/Group';
import {Router} from '@angular/router';
import {ExpenseMember, ExpenseMemberObj} from '../../../models/ExpenseMember';
import {Expense, ExpenseObj} from '../../../models/Expense';
import {ExpenseInsert} from '../../../models/ExpenseInsert';
import {ExpenseOverviewEntry} from '../../../models/ExpenseOverviewEntry';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class CostManagementService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;
    private expenseUrl = `${this.baseUrl}expenses`;
    public members: ExpenseMember[] = [];
    public expenses: Expense[][] = [[]];
    public expenseOverview: ExpenseOverviewEntry[] = [];

    constructor(private http: Http, private router: Router) {
        super();
    }

    goToCostManagement = () => {
        this.router.navigate(['cost-management']);
    };

    getCurrentMembers(): Observable<any> {
        return this.http.get(`${this.groupUrl}/currentMembers`)
            .map(this.extractData)
            .map((membersObj: ExpenseMemberObj) => this.members = membersObj.members)
            .catch(this.handleError);
    }

    addExpense(expense: ExpenseInsert): Observable<any> {
        return this.http.post(`${this.expenseUrl}`, expense, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getExpenses(monthCount: number) {
        const date = new Date();
        for (let m = 0; m < monthCount; m++) {
            this.http.get(`${this.expenseUrl}?year=${date.getFullYear()}&month=${date.getMonth() + 1}`)
                .map(this.extractData)
                .map((obj: ExpenseObj) => this.handleExpenses(obj, m))
                .catch(this.handleError).subscribe();
            date.setMonth(date.getMonth() - 1);
        }
    }

    handleExpenses(expensesObj: ExpenseObj, month: number) {
        this.expenses[month] = expensesObj.expenses;
        if (month === 0) {
            this.expenses[0].forEach(expense => {
                // creditors
                const creditorEntries = this.expenseOverview
                    .filter(entry => entry.user.email === expense.creditor.email);
                if (creditorEntries.length > 0) {
                    creditorEntries[0].amount += expense.amount;
                } else {
                    this.expenseOverview.push(new ExpenseOverviewEntry(
                        expense.creditor,
                        expense.amount
                    ));
                }
                // debitors
                const debitors = this.expenseOverview
                    .filter(entry => expense.debitors.some(debitor => debitor.email === entry.user.email));
                debitors.forEach(debitor => {
                    const debitorEntries = this.expenseOverview
                        .filter(entry => entry.user.email === debitor.user.email);
                    if (debitorEntries.length > 0) {
                        debitorEntries[0].amount -= expense.amount;
                    } else {
                        this.expenseOverview.push(new ExpenseOverviewEntry(
                            debitor.user,
                            expense.amount * -1
                        ));
                    }
                });
            });
        }
    }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AppService } from '../../../app.service';
import { Group, GroupObj } from '../../../../models/Group';
import { Router } from '@angular/router';
import { ExpenseMember, ExpenseMemberObj } from '../../../../models/ExpenseMember';
import { Expense, ExpenseObj } from '../../../../models/Expense';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class CostManagementService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;
    private expenseUrl = `${this.baseUrl}expenses`;
    public members: ExpenseMember[] = [];
    public expenses: Expense[] = [];

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

    addExpense(expense: Expense): Observable<any> {
        return this.http.post(`${this.expenseUrl}`, expense, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getExpenses(year: number, month: number) {
        return this.http.get(`${this.expenseUrl}?year=${year}&month=${month}`)
            .map(this.extractData)
            .map((expensesObj: ExpenseObj) => this.expenses = expensesObj.expenses)
            .catch(this.handleError);
    }
}

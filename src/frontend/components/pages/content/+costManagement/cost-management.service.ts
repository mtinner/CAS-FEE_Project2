import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group, GroupObj} from '../../../../models/Group';
import {Router} from '@angular/router';
import {ExpenseMember, ExpenseMemberObj} from '../../../../models/ExpenseMember';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class CostManagementService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;
    private members: ExpenseMember[] = [];

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
}

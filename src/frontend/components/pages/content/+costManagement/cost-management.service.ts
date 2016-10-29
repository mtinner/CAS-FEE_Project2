import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group, GroupObj} from '../../../../models/Group';
import {Router} from '@angular/router';
import {Member, MemberObj} from '../../../../models/Member';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class CostManagementService extends AppService {

    constructor(private http: Http, private router: Router) {
        super();
    }

    goToCostManagement = () => {
        this.router.navigate(['cost-management']);
    };

}

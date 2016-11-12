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
    private groupUrl = `${this.baseUrl}groups`;
    public members: Member[] = [];

    constructor(private http: Http, private router: Router) {
        super();
    }

    goToCostManagement = () => {
        this.router.navigate(['cost-management']);
    };

    getCurrentMembers(): Observable<any> {
        let response = this.http.get(`${this.groupUrl}/currentMembers`)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((memberObj: MemberObj) => {
            this.members = memberObj.members;
        });

        return response;
    }

}

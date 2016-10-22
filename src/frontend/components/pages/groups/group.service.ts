import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import {AppService} from '../../app.service';
import {Group, GroupObj} from '../../../models/Group';

@Injectable()
export class GroupService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;

    public groups: Group[] = [];

    constructor(private http: Http, private router: Router) {
        super();
    }

    fetchGroups(): Observable<any> {
        return this.http.get(`${this.groupUrl}`)
            .map(this.extractData)
            .map((groupObj: GroupObj) => this.groups = groupObj.groups)
            .catch(this.handleError);
    }

    addGroup(body): Observable<any> {
        return this.http.post(`${this.groupUrl}`, body, this.jsonOptions)
            .map(this.extractData)
            .map((group: Group) => {
                this.groups.forEach((group: Group) => {
                    group.isActiveGroup = false;
                });
                group.isActiveGroup = true;
                this.groups.push(group);
            })
            .catch(this.handleError);
    }

    setActiveGroup(id: number): Observable<any> {
        return this.http.post(`${this.groupUrl}/${id}/active`, null)
            .map(this.extractData)
            .map(() => {
                this.groups.forEach((group: Group) => {
                    if (group.id !== id) {
                        group.isActiveGroup = false;
                    }
                    else {
                        group.isActiveGroup = true;
                    }
                });
            })
            .catch(this.handleError);
    }

    goToSettings = () => {
        this.router.navigate(['settings']);
    };

    goToGroupMembers = (id) => {
        this.router.navigate(['groups', id]);
    };
}
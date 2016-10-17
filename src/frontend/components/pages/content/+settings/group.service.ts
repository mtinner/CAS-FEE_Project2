import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group, GroupObj} from '../../../../models/Group';
import {Router} from '@angular/router';

@Injectable()
export class GroupService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;

    public groups: Group[] = [];

    constructor(private http: Http, private router: Router) {
        super();
    }

    fetchGroups(): Observable<any> {
        let response = this.http.get(`${this.groupUrl}`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((groupObj: GroupObj) => {
            this.groups = groupObj.groups;
        });

        return response;
    }

    // not tested
    addGroup(body): Observable<any> {
        let response = this.http.post(`${this.groupUrl}`, body, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((group: Group) => {
            this.groups.push(group);
        });
        return response;
    }

    setActiveGroup(id: number) {
        let response = this.http.post(`${this.groupUrl}/active/${id}`, null)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe(() => {
            this.groups.forEach((group: Group) => {
                if (group.id !== id) {
                    group.isActiveGroup = false;
                }
                else {
                    group.isActiveGroup = true;
                }
            });
        });
        return response;
    }

    goToSettings = () => {
        this.router.navigate(['settings']);
    };

    goToGroups = () => {
        this.router.navigate(['settings', 'groups']);
    };

    goToGroupMembers = (id) => {
        this.router.navigate(['settings', 'groups', id]);
    };
}

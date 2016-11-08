import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group, GroupObj} from '../../../../models/Group';
import {Router} from '@angular/router';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class GroupService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;

    public groups: Group[] = [];

    constructor(private http: Http, private router: Router) {
        super();
    }

    fetchGroups(): Observable<any> {
        let response = this.http.get(`${this.groupUrl}`)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((groupObj: GroupObj) => {
            this.groups = groupObj.groups;
        });

        return response;
    }


    addGroup(body): Observable<any> {
        let response = this.http.post(`${this.groupUrl}`, body, this.jsonOptions)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((group: Group) => {
            this.groups.forEach((group: Group) => {
                group.isActiveGroup = false;
            });
            group.isActiveGroup = true;
            this.groups.push(group);
        });
        return response;
    }

    setActiveGroup(id: number): Observable<any> {
        let response = this.http.post(`${this.groupUrl}/${id}/active`, null)
            .share()
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

    goToGroupMembers = (id) => {
        this.router.navigate(['settings', 'groups', id]);
    };
}

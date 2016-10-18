import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group, GroupObj} from '../../../../models/Group';
import {Router} from '@angular/router';
import {Member, MemberObj} from '../../../../models/Member';

@Injectable()
export class GroupService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;

    public groups: Group[] = [];
    public members: Member[] = [];

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


    getMembers(id: string): Observable<any> {
        let response = this.http.get(`${this.groupUrl}/${id}/members`)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((memberObj: MemberObj) => {
            this.members = memberObj.members;
        });

        return response;
    }

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

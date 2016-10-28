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
export class GroupService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;

    public groups: Group[] = [];
    public members: Member[] = [];

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


    getMembers(id: string): Observable<any> {
        let response = this.http.get(`${this.groupUrl}/${id}/members`)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((memberObj: MemberObj) => {
            this.members = memberObj.members;
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


    addMember(groupId: string, invitedUser: any): Observable<any> {
        let member = this.members.find((member: Member) => member.email === invitedUser.email);
        if (member) {
            return Observable.of(member);
        }
        let response = this.http.put(`${this.groupUrl}/${groupId}/join`, invitedUser)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((member: Member) => {
            this.members.push(member);
        }, () => {
        });
        return response;
    }

    leaveGroup(groupId: string, email: string) {
        console.log(email);
        let response = this.http.put(`${this.groupUrl}/${groupId}/leave`, {email: email})
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe(() => {
            this.members = this.members.filter((member: Member) => member.email !== email);
        }, () => {
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

    goToGroups = () => {
        this.router.navigate(['settings', 'groups']);
    };

    goToGroupMembers = (id) => {
        this.router.navigate(['settings', 'groups', id]);
    };
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/observable/of';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppService} from '../../app.service';
import {Group, GroupObj} from '../../../models/Group';
import {SnackbarService} from '../../elements/snackbar/snackbar.service';
import {Member, MemberObj} from '../../../models/Member';

@Injectable()
export class GroupService extends AppService  implements CanActivate {
    private groupUrl = `${this.baseUrl}groups`;
    public group: Group;
    public members: Member[] = [];
    public groups: Group[] = [];

    constructor(private http: Http, private router: Router, private snackbarService: SnackbarService) {
        super();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.fetchGroup(route.params['id'])
            .map((group) => !!group)
            .catch((error: any) => {
                this.router.navigate(['/groups']);
                this.snackbarService.showSnackbar('You are not permitted to view this Group');
                return this.handleError(error);
            });
    }

    fetchGroup(id: string): Observable<any> {
        return this.http.get(`${this.groupUrl}/${id}`)
            .map(this.extractData)
            .map((group: Group) => this.group = group)
            .catch(this.handleError);
    }

    fetchGroups(): Observable<any> {
        return this.http.get(`${this.groupUrl}`)
            .map(this.extractData)
            .map((groupObj: GroupObj) => this.groups = groupObj.groups)
            .catch(this.handleError);
    }

    renameGroup(groupId: string, groupname: any) {
        return this.http.put(`${this.groupUrl}/${groupId}`, {name: groupname})
            .map(this.extractData)
            .map((group: Group) => this.group = group)
            .catch(this.handleError);
    }

    getMembers(id: string): Observable<any> {
        return this.http.get(`${this.groupUrl}/${id}/members`)
            .map(this.extractData)
            .map((memberObj: MemberObj) => this.members = memberObj.members)
            .catch(this.handleError);
    }

    addMember(groupId: string, invitedUser: any): Observable<any> {
        let member = this.members.find((member: Member) => member.email === invitedUser.email);
        if (member) {
            return Observable.of(member);
        }
        return this.http.put(`${this.groupUrl}/${groupId}/join`, invitedUser)
            .map(this.extractData)
            .map((member: Member) => this.members.push(member))
            .catch((error: any) => {
                this.snackbarService.showSnackbar(`Email ${invitedUser.email} is not registered`);
                return this.handleError(error);
            });
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

    leaveGroup(groupId: string, email: string) {
        return this.http.put(`${this.groupUrl}/${groupId}/leave`, {email: email})
            .map(this.extractData)
            .map(() => this.members = this.members.filter((member: Member) => member.email !== email))
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
}

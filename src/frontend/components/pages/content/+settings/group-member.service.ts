import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group} from '../../../../models/Group';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/observable/of';
import {Member, MemberObj} from '../../../../models/Member';

@Injectable()
export class GroupMemberService extends AppService implements CanActivate {

    private groupUrl = `${this.baseUrl}groups`;
    public group: Group;
    public members: Member[] = [];

    constructor(private http: Http, private router: Router) {
        super();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.fetchGroup(route.params['id'])
            .map((group) => !!group);
    }

    fetchGroup(id: string): Observable<any> {
       return this.http.get(`${this.groupUrl}/${id}`)
            .map(this.extractData)
            .map((group: Group) => this.group = group)
            .catch(this.handleError);
    }

    renameGroup(groupId: string, groupname: any) {
        return this.http.put(`${this.groupUrl}/${groupId}`, {name: groupname})
            .map(this.extractData)
            .map((group: Group) => this.group = group)
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
            .catch(this.handleError);
    }

    getMembers(id: string): Observable<any> {
        return this.http.get(`${this.groupUrl}/${id}/members`)
            .map(this.extractData)
            .map((memberObj: MemberObj) => this.members = memberObj.members)
            .catch(this.handleError);
    }

    leaveGroup(groupId: string, email: string) {
        return this.http.put(`${this.groupUrl}/${groupId}/leave`, {email: email})
            .map(this.extractData)
            .map(() => this.members = this.members.filter((member: Member) => member.email !== email))
            .catch(this.handleError);
    }

    goToGroups = () => {
        this.router.navigate(['settings', 'groups']);
    };
}

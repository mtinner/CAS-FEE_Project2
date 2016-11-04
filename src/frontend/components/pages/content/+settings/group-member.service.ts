import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group} from '../../../../models/Group';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class GroupMemberService extends AppService implements CanActivate {

    private groupUrl = `${this.baseUrl}groups`;

    public group: Group;
    /*public members: Member[] = [];*/

    constructor(private http: Http, private router: Router) {
        super();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.fetchGroup(route.params['id'])
            .map((group) => !!group);
    }

    fetchGroup(id: string): Observable<any> {
        let response = this.http.get(`${this.groupUrl}/${id}`)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((group: Group) => {
            this.group = group;
        });

        return response;
    }

    renameGroup(groupId: string, groupname: any) {
        let response = this.http.put(`${this.groupUrl}/${groupId}`, {name: groupname})
            .share()
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((group: Group) => {
            this.group = group;
        });
        return response;
    }

    /*    getMembers(id: string): Observable<any> {
     let response = this.http.get(`${this.groupUrl}/${id}/members`)
     .share()
     .map(this.extractData)
     .catch(this.handleError);
     response.subscribe((memberObj: MemberObj) => {
     this.members = memberObj.members;
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
     let response = this.http.put(`${this.groupUrl}/${groupId}/leave`, {email: email})
     .share()
     .map(this.extractData)
     .catch(this.handleError);
     response.subscribe(() => {
     this.members = this.members.filter((member: Member) => member.email !== email);
     }, () => {
     });
     return response;
     }*/
}

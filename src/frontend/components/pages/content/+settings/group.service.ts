import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {AppService} from '../../../app.service';
import {Group, GroupObj} from '../../../../models/Group';

@Injectable()
export class GroupService extends AppService {
    private groupUrl = `${this.baseUrl}groups`;

    public groups: Group[] = [];

    constructor(private http: Http) {
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
   /* addGroup(body): Observable<any> {
        let response = this.http.post(`${this.groupUrl}`, body, this.jsonOptions)
            .map(this.extractData)
            .catch(this.handleError);
        response.subscribe((group: Group) => {
            this.groups.push(group);
        });
        return response;
    }*/
}
